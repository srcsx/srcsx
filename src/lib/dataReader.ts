import fs from "fs";
import path from "path";

export type FileType =
  | "universities"
  | "majors"
  | "docs"
  | "syllabi"
  | "courses"
  | "course_requisites"
  | "course_unit_requisites"
  | "course_groups"
  | "terms_courses_syllabi"
  | "files"
  | "refrence_courses"
  | "courses_resources";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface JsonFileResult<T = any> {
  path: string;
  data: T;
  type: FileType;
}

const FILE_PRIORITY = [
  "universities.json",
  "majors.json",
  "docs.json",
  "syllabi.json",
  "courses.json",
  "course_requisites.json",
  "course_unit_requisites.json",
  "course_groups.json",
  "terms_courses_syllabi.json",
  "files.json",
  "refrence_courses.json",
  "courses_resources.json",
];

function sortFilesByPriority(files: string[]): string[] {
  return files.sort((a, b) => {
    const aIdx = FILE_PRIORITY.indexOf(a);
    const bIdx = FILE_PRIORITY.indexOf(b);

    if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
    if (aIdx !== -1) return -1;
    if (bIdx !== -1) return 1;

    return a.localeCompare(b);
  });
}

function sortDirectories(dirs: string[]): string[] {
  return dirs.sort((a, b) => {
    const aUnder = a.startsWith("_");
    const bUnder = b.startsWith("_");

    if (aUnder && !bUnder) return -1;
    if (!aUnder && bUnder) return 1;

    return a.localeCompare(b);
  });
}

function fileNameToType(fileName: string): string {
  return fileName.replace(/\.json$/, "");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function readAllJsonFiles<T = any>(
  dirPath: string,
): JsonFileResult<T>[] {
  const results: JsonFileResult<T>[] = [];

  const items = fs.readdirSync(dirPath, { withFileTypes: true });

  const dirs = items.filter((i) => i.isDirectory()).map((d) => d.name);
  const files = items.filter((i) => i.isFile()).map((f) => f.name);

  const sortedDirs = sortDirectories(dirs);
  const sortedFiles = sortFilesByPriority(files);

  for (const file of sortedFiles) {
    if (file.endsWith(".json")) {
      const fullPath = path.join(dirPath, file);
      const content = fs.readFileSync(fullPath, "utf8");

      try {
        const parsed = JSON.parse(content);

        results.push({
          path: fullPath,
          type: fileNameToType(file) as FileType,
          data: parsed,
        });
      } catch {
        console.error("Invalid JSON:", fullPath);
      }
    }
  }

  for (const sub of sortedDirs) {
    const fullPath = path.join(dirPath, sub);
    results.push(...readAllJsonFiles(fullPath));
  }

  return results;
}
