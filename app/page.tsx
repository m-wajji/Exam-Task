"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { loremSchema } from "@/schemas/loremSchema";
import { createLorem } from "@/actions/createLorem";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getLorems } from "@/actions/getLorums";
import { deleteLorem } from "@/actions/deleteLorum";

const Home = () => {
  const [lorem, setLorem] = useState<any>();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loremSchema>>({
    resolver: zodResolver(loremSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loremSchema>) {
    createLorem(values).then(() => {
      router.refresh();
    });
  }

  useEffect(() => {
    getLorems()
      .then((data) => {
        setLorem(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lorem]);

  const handleDelete = useCallback((loremId: String) => {
    deleteLorem(loremId).then(() => {
      router.refresh();
    });
  }, []);

  return (
    <div className="flex flex-col gap-5 min-h-screen bg-yellow-200 items-center p-8">
      <div className="grid grid-cols-3 gap-8 ">
        <div className="flex flex-col items-center justify-center rounded-md bg-green-300 border border-black w-[200px] h-[100px]">
          <h1>lorem ispum</h1>
          <h1 className="text-3xl font-bold">03</h1>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md bg-purple-300 border border-black w-[200px] h-[100px]">
          <h1>lorem ispum</h1>
          <h1 className="text-3xl font-bold">11</h1>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md bg-orange-300 border border-black w-[200px] h-[100px]">
          <h1>lorem ispum</h1>
          <h1 className="text-3xl font-bold">52</h1>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-x-2 items-start justify-center w-[665px] "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full ">
                <FormControl>
                  <Input
                    placeholder="Enter something here..."
                    {...field}
                    className="w-[550px] border border-black  bg-yellow-200"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size={"lg"}>
            Create
          </Button>
        </form>
      </Form>

      {lorem?.map((data: any) => {
        return (
          <Card
            key={data.id}
            className="flex flex-col rounded-lg bg-white w-[665px] border border-black "
          >
            <CardContent>
              <p className="text-xl font-bold pt-8">{data.name}</p>
              <p className="text-[12px]">{new Date(data.createdAt).toLocaleString()}</p>
              
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant={"destructive"}
                size={"sm"}
                className="rounded-lg"
              >
                Click Me
              </Button>
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => {
                  handleDelete(data.id);
                }}
              >
                <MdOutlineDeleteOutline size={30} />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
