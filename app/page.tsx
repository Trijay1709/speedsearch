'use client'
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";


export default function Home() {
  const [input,setInput]=useState<string>('');
  const [results,setResults]=useState<{
    duration:number
    results:string[]
  }>()
  useEffect(()=>{
   const fetchData = async () => {
   if(!input) return setResults(undefined);
  const res = await fetch( `/api/search?q=${input}`);  
   };
   fetchData()
  },[input])
  return (
    <>
    <div>
      <Input value={input} type="text" onChange={(e)=>{
       setInput(e.target.value) 
      }}
      
      />
    </div>
    </>
  );
}
