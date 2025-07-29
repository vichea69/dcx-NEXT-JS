"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { formatMyDate } from "@/lib/date";

export const columns = [
  {
    id: "name",
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Student Name <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
  },
  {
    accessorKey: "studentEmail",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Student Email <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
  },
  {
    accessorKey: "quizMark",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quiz Mark <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
  },
  {
    accessorKey: "progress",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Progress <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: ({row}) => {
      const progress = row.getValue("progress");
      return `${progress}%`
    },
  },
  {
    accessorKey: "enrollment_date",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Enroll Date <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: ({row}) => {
      const enrollmentDate = row.getValue("enrollment_date");
      return formatMyDate(enrollmentDate);
    },
  },

];