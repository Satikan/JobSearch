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
        IEnumerable<Postjob> PostJobDeleteAll(Postjob item);
        IEnumerable<Datajob> PostDetailJobAll(Datajob item);
        IEnumerable<Datajob> PostAlljobAll(Datajob item);
        IEnumerable<PermissionItemdata> PostPermissionGroupAll(PermissionItemdata item);
        Employer PostLoginAll(Employer item);
        Employer PostJobImageAll(string imageName, int dataid);
        Employer PostIndexAll(Employer item);
    }
}
