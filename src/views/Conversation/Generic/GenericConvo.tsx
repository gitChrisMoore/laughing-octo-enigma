// ignore typescript in this file

import { useEffect, useState } from "react";
import { Kafka } from "@upstash/kafka";

// const BOOTSTRAP_ENDPOINT = ["up-osprey-6230-us1-kafka.upstash.io:9092"];
// const UPSTASH_KAFKA_USERNAME =
//   "dXAtb3NwcmV5LTYyMzAkV7cVY7Mr0DNHEu63FYKy6PM4oFFHUhEhy9WDO_FOYmc";

const UPSTASH_KAFKA_PASSWORD = "72784a0f2d7647e58185136ceb50a30b";
const TOPIC_NAME = "prod-strategy-market_size";

const GenericConvo: React.FC = () => {
  const [messages, setMessages] = useState([]);

  const kafka = new Kafka({
    url: "https://up-osprey-6230-us1-rest-kafka.upstash.io",
    username: "dXAtb3NwcmV5LTYyMzAkV7cVY7Mr0DNHEu63FYKy6PM4oFFHUhEhy9WDO_FOYmc",
    password: UPSTASH_KAFKA_PASSWORD,
  });

  const c = kafka.consumer();

  useEffect(() => {
    const run = async () => {
      const messages = await c.consume({
        consumerGroupId: "group_1",
        instanceId: "instance_1",
        topics: [TOPIC_NAME],
        // autoOffsetReset: "earliest",
      });
      for (const message of messages) {
        console.log(message.value.toString());
      }
    };
    run();
  }, [c]);

  console.log("connecting");

  return (
    <div>
      <h1>Kafka JS Example</h1>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default GenericConvo;
