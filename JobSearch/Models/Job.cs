using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JobSearch.Models
{
    public class Job
    {
        public int JobID { get; set; }

        public string JobName { get; set; }
    }
}