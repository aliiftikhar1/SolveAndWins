import React from "react";
import Competition from "./components/competitions"
import UserLayout from "../../components/userlayout";
export default function Home(){
    return(
        <>
        <UserLayout>
<Competition/>
</UserLayout>
        </>
    )
}