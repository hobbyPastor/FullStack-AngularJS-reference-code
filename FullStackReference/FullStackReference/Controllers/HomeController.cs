using FullStackReference.Models;
using FullStackReference.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FullStackReference.Controllers
{
    public class HomeController : Controller
    {
        private IMailService _mail;

        public HomeController(IMailService mail)
        {
            _mail = mail;
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public ActionResult Contact(ContactModel model)
        {
            var msg = string.Format("Comment From: {1}{0}Email: {2}{0} Website:{3}{0} Comment: {4}", 
                Environment.NewLine,
                model.Name,
                model.Email,
                model.Website,
                model.Comment);

            if (_mail.SendMail("kristian.berrum@gmail.com", "kristian.berrum@live.com", "Website Contact", msg))
            {
                ViewBag.MailSent = true;
            }

            return View();
        }

        public ActionResult MyMessages()
        {
            return View();
        }

    }
}