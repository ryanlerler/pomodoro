"use client";
import { useState, useEffect } from "react";
import { Box, Button, Text, Center, Progress } from "@chakra-ui/react";

const Home: React.FC = () => {
  const [workTime, setWorkTime] = useState<number>(25 * 60);
  const [breakTime, setBreakTime] = useState<number>(5 * 60);
  const [isWorking, setIsWorking] = useState<boolean>(true);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);
  const totalTime: number = isWorking ? 25 * 60 : 5 * 60;
  const progress: number =
    ((totalTime - (isWorking ? workTime : breakTime)) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && isWorking && workTime > 0) {
      interval = setInterval(() => {
        setWorkTime((prev) => prev - 1);
      }, 1000);
    } else if (isActive && !isWorking && breakTime > 0) {
      interval = setInterval(() => {
        setBreakTime((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isWorking, workTime, breakTime]);

  const handleStartPause: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsActive((prev) => !prev);
  };

  const handleReset: React.MouseEventHandler<HTMLButtonElement> = () => {
    setWorkTime(25 * 60);
    setBreakTime(5 * 60);
    setIsActive(false);
    setIsWorking(true);
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleMode = () => {
    if (isWorking) {
      setCounter((prev) => prev + 1);
    }
    setIsWorking((prev) => !prev);
  };

  useEffect(() => {
    if (workTime === 0) {
      toggleMode();
      setWorkTime(25 * 60);
    }
  }, [workTime]);

  useEffect(() => {
    if (breakTime === 0) {
      toggleMode();
      setBreakTime(5 * 60);
    }
  }, [breakTime]);

  return (
    <Center h="100vh">
      <Box textAlign="center">
        <Text className="flashing" fontSize="6xl">
          Pomodoro 番茄鐘
        </Text>
        <Text fontSize="4xl">
          {isWorking ? "Work Timer 工作時間" : "Break Timer 休息時間"}
        </Text>
        <Text fontSize="3xl">
          {formatTime(isWorking ? workTime : breakTime)}
        </Text>
        <Box mt={4} mb={4}>
          <Progress value={progress} />
        </Box>
        <Button colorScheme="blue" onClick={handleStartPause}>
          {isActive ? "Pause 暫停" : "Start 開始"}
        </Button>
        <Button colorScheme="red" onClick={handleReset} ml={2}>
          Reset 重置
        </Button>
        <Text fontSize="xl" mt={4}>
          Cycle 回合: {counter}
        </Text>
      </Box>
    </Center>
  );
};

export default Home;
