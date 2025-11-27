"use client";
import PageHeading from "@/components/layout/PageHeading";
import { usePageActions } from "@/store/usePageActions";
import axiosInstance from "@/utils/connect";
import { Doc, DocSection } from "@/generated/prisma/client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DocsPage() {
  const calculateAnimationDelay = (i: number) => {
    return i * 0.2;
  };

  const [docs, setDocs] = useState<(Doc & { sections: DocSection[] })[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosInstance("/docs");
      setDocs(result.data);
    };

    fetchData();
  }, []);

  const [selectedDoc, setSelectedDoc] = useState<
    Doc & { sections: DocSection[] }
  >();

  // Handle nav buttons.
  const { setActions, clearActions } = usePageActions();

  useEffect(() => {
    if (selectedDoc) {
      setActions({
        onBack: () => setSelectedDoc(undefined),
      });
    } else {
      clearActions();
    }

    return () => clearActions();
  }, [setActions, clearActions, selectedDoc]);

  return (
    <div>
      {!selectedDoc && (
        <>
          <PageHeading title="داکیومنت ها" />

          <div className="mb-2 flex flex-wrap items-stretch justify-center gap-2 md:justify-start">
            {docs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: calculateAnimationDelay(i + 1),
                }}
              >
                <button
                  onClick={() => setSelectedDoc(item)}
                  className={`relative flex h-full min-w-[168px] items-center justify-center gap-4 rounded-2xl bg-myMain bg-opacity-5 p-6 text-xs text-myBlack transition-all hover:bg-opacity-10 disabled:opacity-50 dark:bg-black dark:bg-opacity-20 dark:text-gray-200 md:min-w-[262px] md:p-8 md:text-base`}
                >
                  <div className="h-2 w-2 rounded-full bg-myBlack dark:bg-gray-200"></div>

                  {item.name}
                </button>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {selectedDoc && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
          }}
        >
          <div>
            <PageHeading title={selectedDoc.name} />

            <div className="space-y-8">
              {selectedDoc.sections?.map((s, i) => (
                <div key={i} className="text-myBlack dark:text-gray-200">
                  <div className="mb-4 flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-4 dark:bg-black dark:bg-opacity-20">
                    <div className="h-2 w-2 rounded-full bg-myBlack dark:bg-gray-200"></div>

                    {s.title}
                  </div>
                  <div
                    className="px-4"
                    dangerouslySetInnerHTML={{ __html: s.message }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
