import InteractiveDiv from "@/components/client/InteractiveDiv";
import { faker } from "@faker-js/faker";
import type { Invoice } from "../lib/.d.ts";

export default function Home() {
  return (
    <main className="min-h-screen">
      <InteractiveDiv data={generateFakerData()} />
    </main>
  );
}

// get data
function generateFakerData() {
  return Array.from({ length: 15 }, () => {
    const invoice: Invoice = {
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      amount: faker.finance.amount({ min: -10000, max: 10000 }),
      routingNumber: faker.finance.routingNumber(),
      date: faker.date.anytime().toISOString(),
    };
    return invoice;
  });
}
