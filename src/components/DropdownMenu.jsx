import ChevronRight from "../assets/chevron-right.svg?react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

/**
* @param {Array<string>} selections 
* @param {number} selectedIndex 
* @param {(number) => void} setSelectedIndex 
*/
export default function DropdownMenu({
  selections,
  selectedIndex,
  setSelectedIndex,
  className = "",
  borderColor = ""
}) {
 if (selections.length === 0 || selections.length - 1 < selectedIndex) return;
 
 const [expanded, setExpanded] = useState(false);
 const hidden = {
   scale: 0.4,
   opacity: 0,
   marginTop: "-50px"
 };

 return (
   <div className={`relative ${className}`}>
     <div 
       className={`
           flex justify-between items-center border-1 p-2 ${
           expanded ? "bg-primary border-primary rounded-tl-[4px] rounded-tr-[4px]" 
             : "rounded-[4px] border-white bg-transparent"
         } transition-all gap-4 select-none cursor-pointer duration-200
       `}
       onClick={() => setExpanded(!expanded)}
       style={{
        borderColor: borderColor
       }}
     >
       {selections[selectedIndex]}
       <ChevronRight className="rotate-90 size-[16px]" />
     </div>
     <AnimatePresence>
       {
         expanded && <motion.div
           className={`
             rounded-bl-[4px] rounded-br-[4px] border-1 border-white bg-black
             absolute z-100
           `}
           initial={hidden}
           animate={{
             scale: 1,
             opacity: 1,
             marginTop: "8px"
           }}
           exit={hidden}
           style={{
             borderColor: borderColor
           }}
         >
           {
             selections.map((s, i) => (
               <div
                 className="select-none cursor-pointer"
                 onClick={() => {
                   setExpanded(false);
                   setSelectedIndex(i);
                 }}
               >
                 <div className="p-2">
                   {s}
                 </div>
                 {
                    (i !== selections.length - 1) && <hr 
                      className="border-1 border-white"
                      style={{
                        borderColor: borderColor
                      }} 
                    />
                 }
               </div>
             ))
           }
         </motion.div>
       }
     </AnimatePresence>
   </div>
 );
}