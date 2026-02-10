import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import '../globals.css'

type PopupWordleProps = {
    open: boolean;
    onClose: () => void;
};

function PopupWordle({ open, onClose }: PopupWordleProps) {
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="m-0 p-0 flex items-center justify-center fixed inset-0 font-sans bg-black/60 backdrop-blur-sm z-[999]"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className="w-80 h-auto max-h-[70vh] bg-white shadow-md rounded-xl grid grid-rows-8"
                        initial={{ scale: 0.8, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 40, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        <div className='m-0 p-0 flex items-center justify-center fixed inset-0 font-sans z-[999]'>
                            <div className='w-80 h-auto max-h-[70vh] bg-white shadow-md rounded-xl grid grid-rows-8'>
                                <div className="flex flex-cols items-center justify-center row-span-1 p-2 shadow-md">
                                    <h1 className='font-bold text-2xl'>Your Prediction</h1>
                                </div>
                                <div className="row-span-6 overflow-y-auto custom-scrollbar">
                                    <div className='flex justify-center p-2'>
                                        <img src="mu.png" className='h-40 w-auto flex items-center justify-center' />
                                    </div>
                                    <div className='p-4 gap-4 text-center'>
                                        <h1 className='text-2xl font-bold'>คนต้องขื่อคา</h1>
                                        <h2 className='leading-relaxed'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, beatae. Officiis itaque ratione saepe aperiam iure veritatis odio molestias iusto fugiat nihil laborum perferendis exercitationem dolore nesciunt, magnam, culpa nostrum!
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit iure consectetur ipsa voluptatum vitae deleniti hic perspiciatis eligendi asperiores, maiores accusantium dignissimos quas? Doloribus ab omnis nulla deserunt fugit. Similique.
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi accusamus labore facilis consequuntur earum nihil ea fugiat, deleniti quos nisi? Voluptate at quasi sequi tempora tempore repellat non, eos reiciendis!
                                        </h2>
                                    </div>
                                </div>
                                <div className="row-span-1 flex items-center justify-center shadow-[0_-2px_5px_rgba(0,0,50,0.2)]">
                                    <button className='bg-blue-200  w-40 h-12 rounded-lg hover:bg-blue-500 '>ดูดวงอีกครั้ง</button>  {/* onclick กลับไปหน้าให้เลือก gender เพื่อความสะดวกสบาย */}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}

export default PopupWordle
