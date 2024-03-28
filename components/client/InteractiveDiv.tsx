"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"; // Correct import for React
import type { Invoice } from "../../lib/.d.ts";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function InteractiveDiv({ data }: { data: Invoice[] }) {
  const [invoices, setInvoices] = useState<Invoice[]>();
  const [invoice, setInvoice] = useState<Invoice>();
  const [edit, setEdit] = useState<Invoice>();
  const [input, setInput] = useState<string>();

  function saveHandler() {
    if (invoices) {
      setInvoices(
        invoices.map((i) => {
          if (i.name === invoice?.name) {
            const newInvoice = { ...i, name: input as string };
            setInvoice(newInvoice);
            return newInvoice;
          }
          return i;
        })
      );
      setEdit(undefined);
    }
  }

  function renderDate(date: string): string {
    return new Intl.DateTimeFormat(window.navigator.language, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  }

  useEffect(() => {
    setInvoices(data);
  }, [data]);

  return (
    <section className="flex h-full w-full">
      <aside className="w-full max-w-80 h-full overflow-auto bg-zinc-600 ">
        {!invoices && <p className="p-4">Loading...</p>}
        {invoices && invoices.length > 0 && (
          <ul className="flex flex-col gap-4 p-4">
            {invoices.map((invoice) => (
              <li key={invoice.name}>
                <Button
                  className="text-start w-full h-auto"
                  onClick={() => setInvoice(invoice)}
                >
                  <div className="w-full">
                    <hgroup className="flex justify-between">
                      <h3>{invoice.name}</h3>
                      <p>{invoice.amount}</p>
                    </hgroup>
                    <p>{renderDate(invoice.date)}</p>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        )}
        {invoices && invoices.length === 0 && (
          <div className="flex justify-center p-4">
            <Button onClick={() => setInvoices(data)} className="">
              Load Invoices
            </Button>
          </div>
        )}
      </aside>

      <aside className="bg-zinc-800 flex-1 w-full flex justify-center items-start p-8">
        {invoice && (
          <Card className="max-w-lg w-full h-96 flex flex-col">
            <CardHeader>
              <CardTitle
                className={
                  parseInt(invoice.amount) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {parseInt(invoice.amount) > 0 ? "+" : "-"} ${" "}
                {invoice.amount.replace("-", "")}
              </CardTitle>
              <CardDescription>
                {!edit && <>{invoice.name}</>}
                {edit && (
                  <Input
                    placeholder={invoice.name}
                    onChange={(event) => setInput(event.currentTarget.value)}
                    autoFocus
                  />
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p>Date Recieved: {renderDate(invoice.date)}</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              {!edit && <Button onClick={() => setEdit(invoice)}>Edit</Button>}
              {edit && (
                <Button onClick={() => setEdit(undefined)}>Cancel</Button>
              )}
              {!edit && (
                <Button
                  onClick={() => {
                    if (invoices) {
                      setInvoices(
                        invoices.filter((i) => i.name !== invoice.name)
                      );
                      setInvoice(undefined);
                    }
                  }}
                >
                  Delete
                </Button>
              )}
              {edit && <Button onClick={() => saveHandler()}>Save</Button>}
            </CardFooter>
          </Card>
        )}
      </aside>
    </section>
  );
}
