import {
    Box,
    Button,
    chakra,
    Circle,
    Container,
    Flex,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import {
    AnimatePresence,
    isValidMotionProp,
    motion,
    useAnimation,
} from "framer-motion";
import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import player0 from "../assets/player01.svg";
import player1 from "../assets/player02.svg";
import player2 from "../assets/player03.svg";
import { PLAYER_VARIANTS } from "../constants";
import Player from "./Player";
import * as Scroll from "react-scroll";
import { StartGame } from "./StartGameAnimation";

const LandingAnimation = (): ReactElement => {
    // hooks
    const skylabAnimation = useAnimation();
    const player0Animation = useAnimation();
    const player1Animation = useAnimation();
    const player2Animation = useAnimation();
    const circleAnimation = useAnimation();
    const descriptionAnimation = useAnimation();
    const letsGoAnimation = useAnimation();
    const choosePlayerAnimation = useAnimation();

    // state
    const MotionHeading = useMemo(() => {
        return chakra(motion(Heading), {
            shouldForwardProp: (prop) =>
                isValidMotionProp(prop) || prop === "children",
        });
    }, []);
    const MotionBox = useMemo(() => {
        return chakra(motion.div, {
            shouldForwardProp: (prop) =>
                isValidMotionProp(prop) || prop === "children",
        });
    }, []);
    const MotionFlex = useMemo(() => {
        return chakra(motion(Flex), {
            shouldForwardProp: (prop) =>
                isValidMotionProp(prop) || prop === "children",
        });
    }, []);
    const initialPlayers = useMemo(
        () => [
            {
                animationControl: player0Animation,
                img: player0,
                playerKey: "player0",
            },
            {
                animationControl: player1Animation,
                img: player1,
                playerKey: "player1",
            },
            {
                animationControl: player2Animation,
                img: player2,
                playerKey: "player2",
            },
        ],
        [],
    );
    const [players, setPlayers] = useState(initialPlayers);
    const scroll = Scroll.animateScroll;

    // animation sequence
    const sequence = useCallback(async (): Promise<void> => {
        await skylabAnimation.start(({ x, y, color }) => ({
            scale: 1,
            x,
            y,
            color,
            opacity: [0, 0.4, 0.6, 0.8],
            transition: { times: [0, 0.4, 0.9, 1], duration: 1.5 },
        }));
        player0Animation.start({
            x: 0,
            y: 0,
            transition: { delay: 0.8, duration: 1 },
        });
        player1Animation.start({
            x: 0,
            y: 0,
            transition: { delay: 0.8, duration: 1 },
        });
        player2Animation.start({
            x: 0,
            y: 0,
            transition: { delay: 0.8, duration: 1 },
        });
        await skylabAnimation.start({
            y: -150,
            transition: { delay: 0.8, duration: 1 },
        });
        skylabAnimation.start({
            y: -200,
            transition: { delay: 0.5, duration: 0.5 },
        });
        player0Animation.start({
            y: 30,
            transition: { delay: 0.5, duration: 0.5 },
        });
        player1Animation.start({
            y: 30,
            transition: { delay: 0.5, duration: 0.5 },
        });
        player2Animation.start({
            y: 30,
            transition: { delay: 0.5, duration: 0.5 },
        });
        descriptionAnimation.start({
            display: "block",
            opacity: 1,
            transition: { delay: 0.75, duration: 0.5 },
        });
        await circleAnimation.start({
            display: "block",
            x: 2000,
            transition: { delay: 0.5, duration: 0.5 },
        });
        return await circleAnimation.start({
            display: "none",
        });
    }, []);

    // actions
    const handleClickPlayer = async (playerKey: string) => {
        switch (playerKey) {
            case "player0":
                setPlayers([
                    {
                        animationControl: player0Animation,
                        img: player0,
                        playerKey: "player0",
                    },
                ]);
                break;
            case "player1":
                setPlayers([
                    {
                        animationControl: player1Animation,
                        img: player1,
                        playerKey: "player1",
                    },
                ]);
                break;
            case "player2":
                setPlayers([
                    {
                        animationControl: player2Animation,
                        img: player2,
                        playerKey: "player2",
                    },
                ]);
                break;
            default:
        }

        // animate after click
        await descriptionAnimation.start({
            opacity: 0,
            transition: { duration: 0.5 },
        });
        choosePlayerAnimation.start({
            y: -150,
            transition: { duration: 1 },
        });
        letsGoAnimation.start({
            opacity: 1,
            transition: { duration: 1 },
        });
    };

    // run animation sequence when components mount
    useEffect(() => {
        sequence();
    }, []);

    return (
        <Container
            overflow="hidden"
            pos="relative"
            left="50%"
            m="auto"
            maxW="100%"
            h="100vh"
            transform="translateX(-50%)"
            whiteSpace="nowrap"
        >
            <Box
                pos="absolute"
                left="50%"
                top={{ base: "45%", md: "50%" }}
                transform="translate(-50%, -50%)"
            >
                <MotionHeading
                    color="#39ACFF"
                    fontSize={{ base: "70px", md: "80px", xl: "150px" }}
                    initial={{
                        scale: 3,
                        x: 2000,
                    }}
                    custom={{ x: 0, y: 3 }}
                    animate={skylabAnimation}
                >
                    Sky Lab
                </MotionHeading>
            </Box>
            <Box
                pos="absolute"
                left="50%"
                top={{ base: "45%", md: "50%" }}
                transform="translate(-50%, -50%)"
            >
                <MotionHeading
                    color="#13FFDA"
                    fontSize={{ base: "70px", md: "80px", xl: "150px" }}
                    initial={{
                        scale: 3,
                        x: -2000,
                    }}
                    custom={{ x: 3 }}
                    animate={skylabAnimation}
                >
                    Sky Lab
                </MotionHeading>
            </Box>
            <Box
                pos="absolute"
                left="50%"
                top={{ base: "45%", md: "50%" }}
                transform="translate(-50%, -50%)"
            >
                <MotionHeading
                    fontSize={{ base: "70px", md: "80px", xl: "150px" }}
                    initial={{ scale: 200, y: 0 }}
                    custom={{
                        color: ["#FF2788", "#FF2788", "#FF2788", "#fff"],
                        x: 0,
                        y: 0,
                    }}
                    animate={skylabAnimation}
                >
                    Sky Lab
                </MotionHeading>
            </Box>
            <MotionBox
                pos="absolute"
                top={{ base: "45%", md: "50%" }}
                w="100%"
                initial={{ display: "none", x: -300 }}
                animate={circleAnimation}
            >
                <Circle
                    opacity="0.8"
                    pos="absolute"
                    top="6px"
                    left={0}
                    size="100px"
                    bg="#FF2788"
                />
                <Circle
                    opacity="0.6"
                    pos="absolute"
                    top="6px"
                    left="15px"
                    size="100px"
                    bg="#39ACFF"
                />
                <Circle
                    opacity="0.4"
                    pos="absolute"
                    left="30px"
                    size="100px"
                    bg="green.200"
                />
            </MotionBox>
            <MotionBox
                pos="absolute"
                left="50%"
                top={{ base: "40%", md: "48%" }}
                transform="translate(-50%, -50%)"
                initial={{ display: "none", opacity: 0 }}
                animate={descriptionAnimation}
            >
                <Stack
                    spacing="5px"
                    fontSize={{
                        base: "16px",
                        sm: "21px",
                        md: "24px",
                        lg: "30px",
                    }}
                    alignItems="center"
                >
                    <Text color="#237EFF">PFP, Strategy Game</Text>
                    <Text>NFT Risk Protocol</Text>
                    <Text>Collide Attack Defend Stake Upgrade</Text>
                </Stack>
            </MotionBox>
            <MotionBox
                pos="absolute"
                left="50%"
                top={{ base: "70%", md: "88%" }}
                transform="translate(-50%, -50%)"
                initial={{ display: "none", opacity: 0 }}
                animate={descriptionAnimation}
            >
                <Text fontSize={{ base: "24px", md: "35px", lg: "45px" }}>
                    Choose Your Pilot
                </Text>
            </MotionBox>
            <MotionBox
                pos="absolute"
                top={{ base: "60%", md: "75%" }}
                initial={{ opacity: 0 }}
                animate={letsGoAnimation}
            >
                <StartGame />
            </MotionBox>
            <AnimatePresence>
                <Box
                    pos="absolute"
                    left="50%"
                    top={{ base: "55%", md: "65%" }}
                    transform="translate(-50%, -50%)"
                >
                    <MotionFlex
                        justifyContent="space-between"
                        alignItems="center"
                        gridGap={{ base: "10px", md: "50px" }}
                        initial={{ y: 0 }}
                        animate={choosePlayerAnimation}
                    >
                        {players.map((player) => (
                            <Player
                                key={player.img}
                                variants={PLAYER_VARIANTS}
                                onClickPlayer={handleClickPlayer}
                                {...player}
                            />
                        ))}
                    </MotionFlex>
                </Box>
            </AnimatePresence>
        </Container>
    );
};

export default LandingAnimation;
