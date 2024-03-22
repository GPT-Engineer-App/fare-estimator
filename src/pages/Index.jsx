import React, { useState } from "react";
import { Box, Heading, Text, VStack, HStack, Select, Input, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Grid, GridItem, Container, Icon } from "@chakra-ui/react";
import { FaTaxi, FaInfoCircle } from "react-icons/fa";

const Index = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const [additionalPassengers, setAdditionalPassengers] = useState(0);
  const [children, setChildren] = useState(0);
  const [luggage, setLuggage] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [waitingTime, setWaitingTime] = useState(0);
  const [fare, setFare] = useState(0);

  const calculateFare = () => {
    let startFare = 0;
    let yardsFare = 0;
    let yardsPerUnit = 0;

    const selectedDate = new Date(date);
    const selectedTime = time.split(":");
    const hour = parseInt(selectedTime[0]);

    if ((selectedDate.getMonth() === 11 && selectedDate.getDate() === 24 && hour >= 22) || (selectedDate.getMonth() === 11 && selectedDate.getDate() === 25) || (selectedDate.getMonth() === 11 && selectedDate.getDate() === 26) || (selectedDate.getMonth() === 11 && selectedDate.getDate() === 31 && hour >= 22) || (selectedDate.getMonth() === 0 && selectedDate.getDate() === 1)) {
      startFare = 5.6;
      yardsFare = 0.2;
      yardsPerUnit = 116;
    } else if ((selectedDate.getDay() >= 1 && selectedDate.getDay() <= 5 && hour >= 21) || selectedDate.getDay() === 6 || selectedDate.getDay() === 0 || (selectedDate.getMonth() === 11 && selectedDate.getDate() === 24 && hour >= 18 && hour < 22) || (selectedDate.getMonth() === 11 && selectedDate.getDate() === 31 && hour >= 18 && hour < 22)) {
      startFare = 2.6;
      yardsFare = 0.2;
      yardsPerUnit = 116;
    } else if (hour >= 0 && hour < 6) {
      startFare = 3.6;
      yardsFare = 0.2;
      yardsPerUnit = 116;
    } else {
      startFare = 2.6;
      yardsFare = 0.2;
      yardsPerUnit = 160;
    }

    const distanceInYards = distance * 1760;
    const distanceFare = Math.ceil(distanceInYards / yardsPerUnit) * yardsFare;
    const additionalPassengersFare = additionalPassengers * 0.3;
    const childrenFare = Math.floor(children / 2) * 0.3;
    const luggageFare = luggage * 0.3;
    const cyclesFare = cycles * 0.9;
    const waitingTimeFare = Math.ceil(waitingTime / 30) * 0.2;

    const totalFare = startFare + distanceFare + additionalPassengersFare + childrenFare + luggageFare + cyclesFare + waitingTimeFare;

    setFare(totalFare.toFixed(2));
  };

  return (
    <Box bg="gray.100" minHeight="100vh">
      <Box bg="white" py={4} px={8} boxShadow="md">
        <Heading as="h1" size="xl" mb={4}>
          <Icon as={FaTaxi} mr={2} />
          Blackpool Taxi Fare Calculator
        </Heading>
      </Box>
      <Container maxW="container.lg" py={8}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
          <GridItem>
            <Box bg="white" p={6} borderRadius="md" boxShadow="md">
              <Heading as="h2" size="lg" mb={4}>
                Tariffs
              </Heading>
              <VStack spacing={4} alignItems="flex-start">
                <Heading as="h2" size="xl">
                  Tariffs
                </Heading>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Tariff</Th>
                        <Th>Description</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>Tariff 1</Td>
                        <Td>
                          Monday to Friday 6.00am to 8.00pm
                          <br />
                          £2.60 start for first 160 yards and every subsequent 160 yards 20p
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Tariff 2</Td>
                        <Td>
                          Monday to Friday 9.00pm to 12.00am, Saturdays, Sundays and bank holidays
                          <br />
                          £2.60 start for first 116 yards and every subsequent 116 yards 20p
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Tariff 3</Td>
                        <Td>
                          Daily from 12.00am to 6.00am
                          <br />
                          £3.60 start for first 116 yards and every subsequent 116 yards 20p
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Tariff 4</Td>
                        <Td>
                          Christmas and New Year
                          <br />
                          £5.60 Start for first 116 yards and every subsequent 116 yards 20p
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Text>
                  <strong>Additional Passengers:</strong> In excess of one - 30p for each additional adult passenger.
                </Text>
                <Text>
                  <strong>Children:</strong> For every two passengers 3 to 12 years - 30p.
                </Text>
                <Text>
                  <strong>Luggage, Prams and Dogs:</strong> Each item 30p.
                </Text>
                <Text>
                  <strong>Cycles:</strong> 90p
                </Text>
                <Text>
                  <strong>Waiting Time:</strong> All Tariffs - 20p for each period of 30 seconds. The meter adds this automatically.
                </Text>
              </VStack>
            </Box>
          </GridItem>
          <GridItem>
            <Box bg="white" p={6} borderRadius="md" boxShadow="md">
              <Heading as="h2" size="lg" mb={4}>
                Fare Calculator
              </Heading>
              <VStack spacing={4} alignItems="stretch">
                <HStack>
                  <Text>Date:</Text>
                  <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </HStack>
                <HStack>
                  <Text>Time:</Text>
                  <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </HStack>
                <HStack>
                  <Text>Distance (miles):</Text>
                  <Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
                </HStack>
                <HStack>
                  <Text>Additional Passengers:</Text>
                  <Select value={additionalPassengers} onChange={(e) => setAdditionalPassengers(parseInt(e.target.value))}>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <HStack>
                  <Text>Children (3-12 years):</Text>
                  <Select value={children} onChange={(e) => setChildren(parseInt(e.target.value))}>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <HStack>
                  <Text>Luggage, Prams, Dogs:</Text>
                  <Select value={luggage} onChange={(e) => setLuggage(parseInt(e.target.value))}>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <HStack>
                  <Text>Cycles:</Text>
                  <Select value={cycles} onChange={(e) => setCycles(parseInt(e.target.value))}>
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Select>
                </HStack>
                <HStack>
                  <Text>Waiting Time (seconds):</Text>
                  <Input type="number" value={waitingTime} onChange={(e) => setWaitingTime(e.target.value)} />
                </HStack>
                <Button colorScheme="blue" onClick={calculateFare}>
                  Calculate Fare
                </Button>
              </VStack>
              <Text fontSize="2xl" mt={8}>
                Estimated Fare: <strong>£{fare}</strong>
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
