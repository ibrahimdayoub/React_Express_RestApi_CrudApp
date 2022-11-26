const exprees = require("express")
const router = exprees.Router()
const {
    getTeams,
    setTeam,
    getTeam,
    updateTeam,
    removeTeam
} = require("../controllers/teamController")

router.route("/").get(getTeams).post(setTeam)
router.route("/:id").get(getTeam).put(updateTeam).delete(removeTeam)

module.exports = router

/*
    router.get("/",getTeams)
    router.post("/",setTeam)
    router.get("/:id",getTeam)
    router.put("/:id",updateTeam)
    router.delete("/:id",removeTeam)
*/

/*
    const teams = [{
            name:"OSUM Team",
            member_no:2,
            frameworks:{
                backend:["express","mongodb"],
                frontend:["react","flutter"]
            }
        },
        {
            name:"CompaStudent Team",
            member_no:3,
            frameworks:{
                backend:["laravel","mysql"],
                frontend:["react"]
            }
        }]
*/