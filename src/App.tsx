import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div`
  height: 90vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 40px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;


const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255, 1);
  height: 80px;
  width: 80px;
  border-radius: 40px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 10vh;
`;

const SwitchButton = styled.button``;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const hoverVariants = {
  hover: (custom: number) => {
    return {
      scale: 1.3,
      originX: custom === 1 ?  1 : 0,
      originY: custom === 1 ?  1 : 0,
      transition: {
        duration: 0.3,
        type: "spring"
      },
    };
  } 
};


function App() {
  const [isClicked, setIsClicked] = useState(true);
  const [id, setId] = useState<null | string>(null);
  return (
    <>
    <Wrapper>
      <Grid>
        <Box layoutId="1" onClick={()=> setId("1")} variants={hoverVariants} whileHover="hover" custom={1} ></Box>
        <Box>{isClicked ? <Circle layoutId="circle"/> : null}</Box>
        <Box>{isClicked ? null : <Circle layoutId="circle"/>}</Box>
        <Box layoutId="4" onClick={()=> setId("4")} variants={hoverVariants} whileHover="hover" custom={4} ></Box>
      </Grid>
      
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box layoutId={id} style={{ width: 400, height: 300 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
    <ButtonWrapper>
    <SwitchButton onClick={() => setIsClicked((prev) => !prev)}>Switch</SwitchButton>
    </ButtonWrapper>
    </>
  );
}

export default App;
