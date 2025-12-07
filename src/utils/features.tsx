import UvVector from "@/assets/vectors/UvVector";
import NumbersVector from "@/assets/vectors/NumbersVector";
import BookStarVector from "@/assets/vectors/‌BookStarVector";
import { FlowchartVector } from "@/assets/vectors/FlowchartVector";
import { DocumentVector } from "@/assets/vectors/DocumentVector";
import { OpenBookVector } from "@/assets/vectors/OpenBookVector";
import { SparkleVector } from "@/assets/vectors/SparkleVector";
// import { RegistrationVector } from "@/assets/vectors/RegistrationVector";
// import { LibraryVector } from "@/assets/vectors/LibraryVector";

interface ItemType {
  title: string;
  href: string;
  icon: React.ReactNode;
  inProgress?: boolean;
  beta?: boolean;
  newItem?: boolean;
  soon?: boolean;
  disabled?: boolean;
  description?: string;
}

export const features: ItemType[] = [
  {
    title: "بررسی واحدهای درسی <br /> (کلی)",
    href: "uv",
    icon: <UvVector />,
    description:
      "از طریق این سیستم می‌تونی هم دسته‌بندی چارت درسی خودت رو مشاهده کنی و هم با انتخاب درس هایی که پاس کردی وضعیت واحد خودتون رو بررسی کنی.",
  },
  {
    title: "بررسی واحدهای درسی <br /> (بر اساس ترم)",
    href: "uv-term-based",
    icon: <UvVector />,
    description:
      "دقیقا مثل سیستم قبلی اینجا هم برای بررسی واحد های درسیته با این تفاوت که بر اساس ترم های تحصیلیت وارد می‌کنی تا وضعیت پیش‌نیاز هات هم مشخص باشه",
  },
  {
    title: "برنامه‌ریزی واحد‌های درسی",
    href: "planning",
    beta: true,
    icon: <SparkleVector />,
    description:
      "اینجا میتونی برای ترم های آیندت برنامه ریزی کنه و اهدافت رو مشخصه کنی.",
  },
  {
    title: "فلوچارت درسی",
    href: "flowchart",
    icon: <FlowchartVector />,
    description:
      "از اینجا میتونی به شکل فلوچارت یه نمای کلی از درس های تخصصیت داشته باشی.",
  },
  {
    title: "دریافت سرفصل‌ها و چارت‌ها",
    href: "files",
    icon: <BookStarVector />,
    description:
      "اگه فایل سرفصل یا چارت درسیت رو میخوای میتونی از اینجا دانلود کنی.",
  },
  {
    title: "داکیومنت <br /> (راهنما و آموزش‌ها)",
    href: "docs",
    icon: <DocumentVector />,
    description:
      "قوانین و مقررات دانشگاه و آموزش رو می‌تونی از اینجا مطالعه کنی.",
  },
  {
    title: "دریافت کد درس‌ها",
    href: "courses-codes",
    icon: <NumbersVector />,
    description:
      "اگه نیاز داری برای انتخاب واحد کد درس های آموزشیار رو یه جا ذخیره کنی میتونی از اینجا بر داری.",
  },
  {
    title: "منابع درسی",
    href: "courses-resources",
    icon: <OpenBookVector />,
    description: "منابع معتبر درس های دانشگاه رو میتونی از اینجا مشاهده کنی.",
  },
  // {
  //   title: "انتخاب واحد آزمایشی",
  //   href: "course-registration",
  //   icon: <RegistrationVector />,
  //   soon: true,
  //   disabled: true,
  //   description:
  //     "از این سیستم میتونی برای انتخاب واحد آزمایشی (در موعد مقرر شده) استفاده کنی.",
  // },
  // {
  //   title: "منابع آموزشی",
  //   href: "sources",
  //   icon: <LibraryVector />,
  //   soon: true,
  //   disabled: true,
  //   description:
  //     "منابع آموزشی (خارج از درس های دانشگاه) رو میتونی از اینجا بر داری.",
  // },
];
