import { replaceMongoIdInArray } from "@/lib/convertData";
import { Category } from "@/model/category-model";

export async function getCategories(){
    const categories = await Category.find({}).lean();
    return replaceMongoIdInArray(categories);
}

export async function getCategoryDetails(categoryId){
    try{
        const category = await Category.findById(categoryId).lean();
        return replaceMongoIdInArray(category);
    }catch (error) {
        throw new Error("Failed to fetch category details");
    }
}