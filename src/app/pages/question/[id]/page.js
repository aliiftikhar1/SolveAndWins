import React from "react";
import QuestionPage from "./components/question";
import UserLayout from "../../../components/userlayout";
export default function Question(){
    return(
        <>
        <UserLayout>
        <QuestionPage/>
        </UserLayout>
        </>
    )
}