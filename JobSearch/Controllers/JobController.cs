using JobSearch.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace JobSearch.Controllers
{
    public class JobController : ApiController
    {
        JobRepository repository = new JobRepository();

        // GET api/job/businesstype
        [HttpGet]
        [ActionName("BusinessType")]
        public IEnumerable<BusinessType> GetBusinessType()
        {
            return repository.GetBusinessTypeAll();
        }

        // GET api/job/province
        [HttpGet]
        [ActionName("Province")]
        public IEnumerable<Province> GetProvince()
        {
            return repository.GetProvinceAll();
        }

        // GET api/job/gender
        [HttpGet]
        [ActionName("Gender")]
        public IEnumerable<Gender> GetGender()
        {
            return repository.GetGenderAll();
        }

        // GET api/job/status
        [HttpGet]
        [ActionName("Status")]
        public IEnumerable<Status> GetStatus()
        {
            return repository.GetStatusAll();
        }

        // GET api/job/jobtype
        [HttpGet]
        [ActionName("Jobtype")]
        public IEnumerable<Jobtype> GetJobtype()
        {
            return repository.GetJobtypeAll();
        }

        // GET api/job/cooperative
        [HttpGet]
        [ActionName("Cooperative")]
        public IEnumerable<Datajob> GetCooperative()
        {
            return repository.GetCooperativeAll();
        }

        // GET api/job/internship
        [HttpGet]
        [ActionName("Internship")]
        public IEnumerable<Datajob> GetInternship()
        {
            return repository.GetInternshipAll();
        }

        // GET api/<controller>/5
        [HttpGet]
        [ActionName("JobOnly")]
        public Datajob GetJobOnly(int id)
        {
            return repository.GetJobOnlyAll(id);
        }

        // GET api/<controller>/5
        [HttpGet]
        [ActionName("UserOnly")]
        public Employer GetUser(int id)
        {
            return repository.GetUserOnly(id);
        }

        // GET api/<controller>/5
        [HttpGet]
        [ActionName("EmployerOnly")]
        public Employer GetEmployer(int id)
        {
            return repository.GetEmployerOnly(id);
        }

        // GET api/<controller>/5
        //[HttpGet]
        //[ActionName("ProfileEmployer")]
        //public Employer GetProfileEmployer(int id)
        //{
        //    return repository.GetProfileEmployerOnly(id);
        //}

        // GET api/<controller>/5
        [HttpGet]
        [ActionName("Applicant")]
        public IEnumerable<Employer> GetApplicant(int id)
        {
            return repository.GetApplicantAll(id);
        }

        // POST api/job/employer
        [HttpPost]
        [ActionName("Employer")]
        public IEnumerable<Employer> PostEmployer(Employer item)
        {

            return repository.PostEmployerAll(item);
        }

        // POST api/job/editprofileemployer
        [HttpPost]
        [ActionName("EditProfileEmployer")]
        public IEnumerable<Employer> PostEditProfileEmployer(Employer item)
        {

            return repository.PostEditProfileEmployerAll(item);
        }

        // POST api/job/seeker
        [HttpPost]
        [ActionName("Seeker")]
        public IEnumerable<Employer> PostSeeker(Employer item)
        {

            return repository.PostSeekerAll(item);
        }

        // POST api/job/postjob
        [HttpPost]
        [ActionName("Postjob")]
        public IEnumerable<Postjob> PostPostjob(Postjob item)
        {

            return repository.PostPostjobAll(item);
        }

        // POST api/job/posteditjob
        [HttpPost]
        [ActionName("PostEditjob")]
        public IEnumerable<Postjob> PostPostEditjob(Postjob item)
        {

            return repository.PostPostEditjobAll(item);
        }

        // POST api/job/notificationemployer
        [HttpPost]
        [ActionName("NotificationEmployer")]
        public IEnumerable<Employer> PostNotificationEmployer(Employer item)
        {

            return repository.PostNotificationEmployerAll(item);
        }

        // POST api/job/DetailJob
        [HttpPost]
        [ActionName("DetailJob")]
        public IEnumerable<Datajob> PostDetailJob(Datajob item)
        {
            return repository.PostDetailJobAll(item);
        }

        // POST api/job/JobDelete
        [HttpPost]
        [ActionName("JobDelete")]
        public IEnumerable<Postjob> PostJobDelete(Postjob item)
        {
            return repository.PostJobDeleteAll(item);
        }

        // POST api/job/counthide
        [HttpPost]
        [ActionName("CountHide")]
        public IEnumerable<Apply> PostCountHide(Apply item)
        {
            return repository.PostCountHideAll(item);
        }

        // POST api/job/applycancle
        [HttpPost]
        [ActionName("ApplyCancle")]
        public IEnumerable<Apply> PostApplyCancle(Apply item)
        {
            return repository.PostApplyCancleAll(item);
        }

        // POST api/job/JobDelete
        [HttpPost]
        [ActionName("JobEmployerDelete")]
        public IEnumerable<Postjob> PostJobEmployerDelete(Postjob item)
        {
            return repository.PostJobEmployerDeleteAll(item);
        }

        // POST api/job/interview
        [HttpPost]
        [ActionName("Interview")]
        public Employer PostInterview(Employer item)
        {
            return repository.PostInterviewOnly(item);
        }

        // POST api/job/alljob
        [HttpPost]
        [ActionName("Alljob")]
        public IEnumerable<Datajob> PostAlljob(Datajob item)
        {

            return repository.PostAlljobAll(item);
        }      

        // POST api/job/permissiongroup
        [HttpPost]
        [ActionName("PermissionGroup")]
        public IEnumerable<PermissionItemdata> PostPermissionGroup(PermissionItemdata item)
        {
            return repository.PostPermissionGroupAll(item);
        }

        // POST api/job/pageindex
        [HttpPost]
        [ActionName("PageIndex")]
        public Employer PostStaffIndex(Employer item)
        {
            return repository.PostIndexAll(item);
        }

        // POST api/job/login
        [HttpPost]
        [ActionName("Login")]
        public Employer PostLogin(Employer item)
        {
            return repository.PostLoginAll(item);
        }

        // POST api/job/applycoop
        [HttpPost]
        [ActionName("ApplyCoop")]
        public IEnumerable<Apply> PostApplyCoop(Apply item)
        {
            return repository.PostApplyCoopAll(item);
        }

        // POST api/job/image
        [HttpPost]
        [ActionName("Image")]
        public HttpResponseMessage Post()
        {
            HttpResponseMessage result = null;
            string imageName = "";
            var httpRequest = HttpContext.Current.Request;
            var dataid = httpRequest.Form[0];

            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var fileImg = HttpContext.Current.Server.MapPath("~/images/" + postedFile.FileName);
                    postedFile.SaveAs(fileImg);

                    docfiles.Add(fileImg);
                    imageName = postedFile.FileName.ToString();
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            repository.PostJobImageAll(imageName, Convert.ToInt32(dataid));
            return result;
        }

        // POST api/job/fileupload
        [HttpPost]
        [ActionName("FileUpload")]
        public HttpResponseMessage PostFile()
        {
            
            HttpResponseMessage result = null;
            string filename = "";
            var httpRequest = HttpContext.Current.Request;
            var dataid = httpRequest.Form[0];

            if (httpRequest.Files.Count > 0)
            {
                var docfiles = new List<string>();
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    string fileresume = HttpContext.Current.Server.MapPath("~/resume/");

                    string fileExtension = Path.GetExtension(postedFile.FileName);
                    string renameFile = "Resume" + dataid + fileExtension;

                    var filePath = fileresume + @"\" + renameFile;
                    postedFile.SaveAs(filePath);

                    docfiles.Add(filePath);
                    filename = renameFile;
                }
                result = Request.CreateResponse(HttpStatusCode.Created, docfiles);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            repository.PostJobFileAll(filename, Convert.ToInt32(dataid));
            return result;
        }

        // POST api/job/sentemail
        [HttpPost]
        [ActionName("SentEmail")]
        public IEnumerable<Email> SentEmail(Email items)
        {
            return repository.sentMail(items);
        }

    }
    }
