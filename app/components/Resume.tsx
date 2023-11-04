'use client'
import {Button} from "./ui/button";
import { ToastAction } from "../components/ui/toast"
import { useToast } from "../components/ui/use-toast"
import { useState, useEffect, useRef } from 'react';
import { Textarea } from "./ui/textarea"
import { Textarea as TextareaNextUI }  from "@nextui-org/react"
import {getLocalStorage, getPrompt} from "../../lib/utils"
import { UserAuth } from "../context/AuthContext";
import { useChat } from 'ai/react';
import {db} from '../firebase';
import { TemperatureSelector } from "../components/temperature-selector"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {cn} from '@/lib/utils'
import {Briefcase, ChevronDown, GanttChartSquare } from 'lucide-react'
import {
  collection,
  addDoc,
  getDocs,
  doc
} from 'firebase/firestore';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible"
import DownloadButton from "./DownloadButton";
import CopyButton from "./CopyButton";

const Resume = () => {
  const { user, googleSignIn } = UserAuth();
  const [resume, setResume] = useState(getLocalStorage('resume'));
  const [jobDescription, setJobDescription] = useState("");
  const { messages, setInput, handleSubmit, isLoading, setMessages } = useChat({api: '/api/generate'});
  const [result, setResult] = useState("");

  // var result: string = 
  const { toast } = useToast()
  useEffect(() => {
    if (messages.length === 0){
      setMessages([{id:'asdas', role: "system", content: "You write cover letter professionally and persuasively." }])
    }
    setInput(getPrompt(resume, jobDescription))
      // Set result only during openai streaming, other wise it will be reset if use change resume as it is a dependency in useEffect 
      if (isLoading) {
        setResult((messages.length > 1 && messages.length %2 != 0) ? messages[messages.length - 1].content : "");
    }
    // console.log("message", messages)
    // console.log("user", result)
    // console.log("userCollection", userCollection ? userCollection : null)


  }, [resume, jobDescription, messages]
  );


  const handleButtonClick = async (event) => {
    event.preventDefault();
    if (!resume) {
      console.log("No resume or job description!")
      toast({
        title: "Oops!",
        description: "Please paste your resume and job description",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return;
    }

    const today = new Date().toISOString().split('T')[0]; //"2021-08-10"
    const time = new Date().toISOString().split('T')[1]; //"2021-08-10"
    const userRef = doc(db, "users", user.uid, "date", today);
    const colRef = collection(userRef, "click");
    const docSnap = await getDocs(colRef);

    // allow admin to use more than 5 times
    if (docSnap.empty || (user) || docSnap.size < 5) {
      addDoc(colRef, {
        resume: resume.trim(),
        jobDescription: jobDescription.trim(),
        time: time,
      });
      // store user resume in localstorage
      localStorage.setItem('resume', resume.trim());
      handleSubmit(event);
    } else{
      toast({
        title: "Oops! You have clicked over 5 times today!",
        description: "It's a small personal project with limited key resource... Come back tomorrow! :)",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }


  return (
    <div>
      <div className='flex justify-evenly'>
        <Card className={cn("w-4/5")}>
          <div className='flex justify-between'>

            <div className={'w-1/2'}>
              <CardHeader className='flex items-center'>
                <GanttChartSquare />
                <CardTitle className=''>About you</CardTitle>
              </CardHeader>

              <CardContent className="rounded-md p-8">
                  <Textarea
                    value={resume}
                    placeholder="List your achievements, skills, or paste your resume here"
                    onChange={(e) => setResume(e.target.value)}
                    className="whitespace-pre-line h-64"
                  />
              </CardContent>
            </div>

            <div className={'w-1/2'}>
              <CardHeader className='flex items-center'>
                <Briefcase />
                <CardTitle className=''>About job</CardTitle>
              </CardHeader>
            
              <CardContent className="rounded-md p-8">
                <Textarea
                  value={jobDescription}
                  placeholder="List your dream position, industry, or paste the job summary here"
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="whitespace-pre-line h-64"
                />
              </CardContent>
            </div>
          </div>
            <Collapsible className="my-5">
                <div className="flex justify-center">
                  <CollapsibleTrigger>
                    <ChevronDown size={68}/>
                  </CollapsibleTrigger>
                </div>
                  <CollapsibleContent>
                <div className="flex-1 mx-5 p-6 justify-center">
                    <TemperatureSelector defaultValue={[0.56]} />
                </div>
                  </CollapsibleContent>
            </Collapsible>
          
          <div>
            {user?
              (<form className="w-full justify-evenly px-8 pb-3">
                <Button disabled={isLoading} onClick={handleButtonClick} className="w-full h-full justify-evenly px-8">
                <span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl">Generate</span>
                </Button>
              </form>)
              :
              (
                <div className="justify-evenly px-8">
                  <Button onClick={googleSignIn} className="w-full h-full">
                    <span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-3xl">Generate</span>
                  </Button>
                </div>
              )
            }
          </div>
          <div className="flex justify-between p-8">
            <CardTitle>Customized Cover Letter</CardTitle>
            <div className="space-x-5">
              <DownloadButton result={result} isLoading={isLoading} toast={toast}/>
              <CopyButton result={result} toast={toast}/>
            </div>
          </div>

          <div className="justify-evenly mx-8 mb-8">
            <TextareaNextUI 
              disabled={isLoading || !result}
              variant="bordered"
              value={result}
              onChange={e => setResult(e.target.value)}
              className="p-3"
              maxRows={200} 
              placeholder="Click generate to get cover letter"
            />
          </div>
        </Card>
      </div>
      
    </div>
  );
}

export default Resume;