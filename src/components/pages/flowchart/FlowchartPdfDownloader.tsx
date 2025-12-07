import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export async function flowchartPdfDownloader(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const padding = 40;

  // Calculate the final dimensions including padding
  const width = element.scrollWidth + padding * 2;
  const height = element.scrollHeight + padding * 2;

  // Store original styles to restore later
  const originalOverflow = element.style.overflow;
  const originalPadding = element.style.padding;

  // Temporarily hide scrollbars and apply padding for clean rendering
  element.style.overflow = "hidden";
  element.style.padding = `${padding}px`;

  // Render element to Jpeg
  const dataUrl = await toPng(element, {
    cacheBust: true,
    pixelRatio: 1,
    quality: 0.35,
    width,
    height,
  });

  // Restore original styles
  element.style.overflow = originalOverflow;
  element.style.padding = originalPadding;

  // Create a PDF sized exactly to the rendered flowchart
  const pdf = new jsPDF({
    orientation: width > height ? "landscape" : "portrait",
    unit: "px",
    format: [width, height],
    compress: true,
  });

  // Insert the PNG into the PDF
  pdf.addImage(dataUrl, "JPEG", 0, 0, width, height, undefined, "FAST");

  // Save the file
  pdf.save("flowchart.pdf");
}
