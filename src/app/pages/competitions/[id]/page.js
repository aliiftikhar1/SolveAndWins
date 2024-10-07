import React from "react";
import UserLayout from "../../../components/userlayout";
import SingleCompetition from "./components/competitions";
export default function Home(){
    return(
        <>
        <UserLayout>
            <SingleCompetition/>
            </UserLayout>
        </>
    )
}