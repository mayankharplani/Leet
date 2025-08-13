import React, { useState } from 'react'
import {useForm, useFieldArray, Controller} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {Editor} from "@monaco-editor/react"
import {axiosInstance} from "../libs/axios.js"
import toast from 'react-hot-toast'
import {Navigate, useNavigate} from "react-router-dom"


const ProblemSchema = z.object({
    title: z.string().min(3, "Title must be of atleast 3 characters"),
    description: z.string().min(10,"Description must be of atleast 10 characters"),
    difficulty: z.enum(["EASY","MEDIUM","HARD"]),
    tags: z.array(z.string()).min(1,"Atleast one tag is required"),
    constraints: z.string().min(1,"Constraints are requried"),
    hints: z.string().optional(),
    editorial: z.string().optional(),
    testcases: z.array(
        z.object({
            input: z.string().min(1,"Input is required"),
            output: z.string().min(1,"Output is required"),
        })
    ).min(1,"Atleast one test case is required"),
    examples: z.object({
        JAVASCRIPT: z.object({
            input: z.string().min(1,"Input is required"),
            output: z.string().min(1,"Output is required"),
            explanation: z.string().optional()
        }),
        JAVA: z.object({
            input: z.string().min(1,"Input is required"),
            output: z.string().min(1,"Output is required"),
            explanation: z.string().optional()
        }),
        PYTHON: z.object({
            input: z.string().min(1,"Input is required"),
            output: z.string().min(1,"Output is required"),
            explanation: z.string().optional()
        }),
        CPP: z.object({
            input: z.string().min(1,"Input is required"),
            output: z.string().min(1,"Output is required"),
            explanation: z.string().optional()
        }),
    }),
    codeSnippets: z.object({
        JAVASCRIPT: z.string().min(1,"JavaScript Code Snippet is Required"),
        JAVA: z.string().min(1,"Java Code Snippet is Required"),
        PYTHON: z.string().min(1,"Python Code Snippet is Required"),
        CPP: z.string().min(1,"C++ Code Snippet is Required"),        
    }),
    referenceSolutions: z.object({
        JAVASCRIPT: z.string().min(1,"JavaScript Solution is Required"),
        JAVA: z.string().min(1,"Java Solution is Required"),
        PYTHON: z.string().min(1,"Python Solution is Required"),
        CPP: z.string().min(1,"C++ Solution is Required"),        
    })
})












const CreateProblemForm = () => {

    const navigation = useNavigate();
    const {} = useForm({
        resolver: zodResolver(ProblemSchema),
        defaultValues: {

        }
    })

    const {fields: testCaseFields,
        append: appendTestCase,
        remove: removeTestCase,
        replace: replaceTestCases
            } = useFieldArray({
        control,
        name: "testCases"
    })
    const {fields: tagFields,
        append: appendTag,
        remove: removeTag,
        replace: replaceTags
            } = useFieldArray({
        control,
        name: "tags"
    })

    const [isLoading, setIsLoading] = useState(false);

  return (
    <div>

    </div>
  )
}

export default CreateProblemForm