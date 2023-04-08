const express = require("express");
const router = express.Router();

const checkAdmin = (req, res, next) => {
  if (!req.session.isAdmin) {
    return res.send("請先登入管理者系統");
  } else {
    next();
  }
};

const checkUser = (req, res, next) => {
  if (!req.session.isVerified) {
    return res.send("請先登入會員系統");
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  return res.render("session");
});

router.get("/setCookie", (req, res) => {
  res.cookie("nodeCookie", "candy", { signed: true });
  return res.send("已經設置Cookie...");
});

router.get("/seeCookie", (req, res) => {
  console.log(req.signedCookies);
  return res.send("已經設定好的Cookie..." + req.signedCookies.nodeCookie);
});

router.get("/setSession", (req, res) => {
  req.session.example = "something not important...";
  return res.send("在伺服器設置session資料");
});

router.get("/seeSession", (req, res) => {
  return res.send("已經設定好的Session資料" + req.session.example);
});

router.get("/verifyUser", (req, res) => {
  req.session.isVerified = true;
  return res.send("已經被驗證了。。。");
});

router.get("/verifyAdmin", (req, res) => {
  req.session.isVerified = true;
  req.session.isAdmin = true;
  return res.send("你是超級使用者。。。");
});

router.get("/user", checkUser, (req, res) => {
  return res.send("歡迎會員登入。。。");
});

router.get("/user2", checkUser, checkAdmin, (req, res) => {
  console.log(req.session);
  return res.send("歡迎管理者登入");
});

router.get("/clear", (req, res) => {
  req.session.destroy();
  return res.redirect("/students");
});

module.exports = router;
