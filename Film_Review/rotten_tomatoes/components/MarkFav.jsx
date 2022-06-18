import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import React from "react";

function MarkFav() {
    const router = useRouter();
    const { id } = router.query; {/* id de l'utilisateur ! */ }
    console.log(router.query)
    const [markFav, setMarkFav] = useState();

    axios.post(
        `https://api.themoviedb.org/3/account/${id}/favorite?api_key=4d89a942554dede2811f349d8e5383e9`, { markFav }
    ).then(function (reponse) {
        console.log(JSON.stringify(reponse.data));
    })
        .catch(function (error) {
            console.log(error);
        });
    return (
        <>
            <div className="container col-md-6 offset-md-3">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="defaultCheck1" />
                        <label class="form-check-label" for="defaultCheck1">Mark as favorite</label>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MarkFav;