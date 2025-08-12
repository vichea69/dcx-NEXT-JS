import { NextResponse } from "next/server";
import { updateCourse } from "@/app/actions/course";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Initialize S3-compatible client for Cloudflare R2
const r2Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT || (process.env.R2_ACCOUNT_ID ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com` : undefined),
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
});

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("files");
        const courseId = formData.get("courseId");

        if (!file) {
            return NextResponse.json({ error: "File not provided" }, { status: 400 });
        }
        if (!courseId) {
            return NextResponse.json({ error: "courseId not provided" }, { status: 400 });
        }

        const bucket = process.env.R2_BUCKET_NAME;
        if (!bucket) {
            return NextResponse.json({ error: "R2_BUCKET_NAME is not configured" }, { status: 500 });
        }

        // Generate an object key and normalize filename
        const originalName = file.name || "upload.bin";
        const normalizedName = originalName.replace(/\s+/g, "_");
        const key = `courses/${courseId}/${Date.now()}_${normalizedName}`;

        // Convert to Buffer for upload
        const fileArrayBuffer = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileArrayBuffer);

        await r2Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: fileBuffer,
                ContentType: file.type || "application/octet-stream",
            })
        );

        // Public URL base (e.g., https://<bucket>.<accountid>.r2.dev or your CDN/domain)
        const publicBaseUrl = process.env.R2_PUBLIC_BASE_URL;
        const imageUrl = publicBaseUrl ? `${publicBaseUrl.replace(/\/$/, "")}/${key}` : null;

        // Persist to MongoDB (store full URL if available, else the key)
        await updateCourse(courseId, { thumbnail: imageUrl || key });

        return NextResponse.json(
            {
                message: `File ${originalName} uploaded successfully`,
                key,
                imageUrl: imageUrl || null,
            },
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ error: err?.message || "Upload failed" }, { status: 500 });
    }
}