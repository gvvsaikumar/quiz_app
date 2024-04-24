import express,{Request,Response} from "express"
import session from 'express-session'
import passport from "passport";
import  "./oauth2_0-child";
 

const router=express();
router.use(session({secret:"cats"}));
router.use(passport.initialize())
router.use(passport.session());

router.get('/',(req:Request,res:Response)=>{
    res.send('<a href="/auth/google">Authentication with Google</a>');
});

router.get("/auth/google",
    passport.authenticate('google',{scope:['email','profile']})
)
router.get("/google/callback",
  passport.authenticate('google',{successRedirect:"/protected",failureRedirect:"/login"}))

router.get("/protected",(req,res)=>{
  res.send("this is protected area")
})
router.get("/logout", (req, res) => {
  // Destroy the user's session
  req.session.destroy((err) => {
    // If an error occurred during session destruction
    if (err) {
      // Send the error as a response
      res.send(err);
    } else {
      // If session destruction was successful, send a success message
      res.send("logout successfully");
    }
  });
});
export default router;