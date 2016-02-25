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

        // GET api/job/joball
        [HttpGet]
        [ActionName("JobAll")]
        public IEnumerable<Job> Get()
        {
            return repository.GetJobAll();
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
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