using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobSearch.Models
{
    interface IJobRepository
    {
        IEnumerable<BusinessType> GetBusinessTypeAll();
        IEnumerable<Province> GetProvinceAll();
        IEnumerable<Gender> GetGenderAll();
        IEnumerable<Status> GetStatusAll();
        IEnumerable<Jobtype> GetJobtypeAll();
        IEnumerable<Datajob> GetCooperativeAll();
        IEnumerable<Datajob> GetInternshipAll();
        IEnumerable<Employer> PostEmployerAll(Employer item);
        IEnumerable<Employer> PostSeekerAll(Employer item);
        IEnumerable<Postjob> PostPostjobAll(Postjob item);
        IEnumerable<Datajob> PostAlljobAll(Datajob item);
    }
}
