using JobSearch.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
        public string Get(int id)
        {
            return "value";
        }

        // POST api/job/employer
        [HttpPost]
        [ActionName("Employer")]
        public IEnumerable<Employer> PostEmployer(Employer item)
        {

            return repository.PostEmployerAll(item);
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

        // POST api/job/alljob
        [HttpPost]
        [ActionName("Alljob")]
        public IEnumerable<Datajob> PostAlljob(Datajob item)
        {

            return repository.PostAlljobAll(item);
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}