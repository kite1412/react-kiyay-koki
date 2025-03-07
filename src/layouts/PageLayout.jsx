import { JSX } from "react";
import Footer from "../components/Footer";

/**
 * Wrapper for page's content.
 * @param {JSX.Element} content - content of the page.
 * @param {boolean} useFooter - whether use {@link Footer} at the bottom of the content or not.
 */
export default function PageLayout({ content, useFooter = true }) {
  return (
    <div className="flex flex-col w-3/4 pt-[calc(40px*3+80px)]">
      {content}
      {
        useFooter ? <Footer className="z-1" /> : <></>
      }
    </div>
  );
}