import { AnimationControls, motion, useAnimation, useInView } from "framer-motion";
import { FunctionComponent, JSX, ReactElement, useEffect, useRef } from "react";


/**
* Props for the Reveal component.
*/
type RevealProps = {
   /**
    * The children to reveal.
    */
   children: JSX.Element;
};


/**
* Reveal animation component.
*/
const Reveal: FunctionComponent<RevealProps> = (
   props: RevealProps): ReactElement => {
   const { children } = props;


   // reference to the element
   const ref = useRef(null);


   // check if the element is in view
   const inView: boolean = useInView(ref, { once: true });


   // controls for the animation
   const mainControls: AnimationControls = useAnimation();


   useEffect(() => {
       if (inView) {
           mainControls.start("visible");
       }
   }, [ inView ]);


   return (
       <div ref={ ref }>
           <motion.div
               variants={ {
                   initial: { opacity: 0, y: 20 },
                   visible: { opacity: 1, y: 0 }
               } }
               initial="initial"
               animate={ mainControls }
               transition={ {
                   duration: 0.5,
                   delay: 0.5,
                   ease: "easeInOut"
               } }
           >
               { children }
           </motion.div>
       </div>
   );
};


export default Reveal;
