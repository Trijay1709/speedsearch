'use client';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [results, setResults] = useState<{ duration: number; results: string[] }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setResults(undefined);
      const res = await fetch(`/api/search?q=${input}`);
      const data = (await res.json()) as { results: string[]; duration: number };
      setResults(data);
    };
    fetchData();
  }, [input]);

  return (
    <>
      <main className="h-screen w-screen grainy flex flex-col items-center">
        <div className="text-6xl text-black pb-24 pt-[12rem] font-sk animate-in slide-in-from-top-6 fade-in-10 duration-500">
          Redis Search
        </div>
        <Command className="animate-in slide-in-from-top-7 fade-in-10 duration-500 w-[35rem]">
          <CommandInput value={input} onValueChange={ setInput } placeholder="Search for countries" />
          <CommandList>
            {results?.results.length === 0 ? (
              <CommandEmpty>No Results Found</CommandEmpty>
            ) : null}
            {results?.results && (
              <CommandGroup heading="Results">
                {results.results.map((res) => (
                  <CommandItem key={res} value={res} onSelect={() => setInput(res)}>
                    {res}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </main>
    </>
  );
}
