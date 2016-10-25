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
        IEnumerable<Datajob> GetParttimeAll();
        IEnumerable<Datajob> GetFulltimeAll();
        IEnumerable<Datajob> GetNewFeedAll();
        Employer GetUserOnly(int id);
        Datajob GetJobOnlyAll(int id);
        Datajob GetJobOnlyAdminAll(int id);
        Employer GetEmployerOnly(int id);
        Datajob GetDetailJobAll(int id);
        IEnumerable<Employer> GetApplicantAll(int id);
        IEnumerable<Employer> PostEmployerAll(Employer item);
        IEnumerable<Employer> PostEditProfileUserAll(Employer item);
        IEnumerable<Employer> PostEditProfileEmployerAll(Employer item);
        IEnumerable<Employer> PostSeekerAll(Employer item);
        IEnumerable<Postjob> PostPostjobAll(Postjob item);
        IEnumerable<Postjob> PostAdminPostjobAll(Postjob item);
        IEnumerable<Postjob> PostPostEditjobAll(Postjob item);
        IEnumerable<Postjob> PostPostEditJobAdminAll(Postjob item);
        IEnumerable<Postjob> PostJobDeleteAll(Postjob item); 
        IEnumerable<Apply> PostApplyCancleAll(Apply item);
        IEnumerable<Apply> PostCountHideAll(Apply item);
        IEnumerable<Datajob> PostCountHideUserAll(Datajob item);
        IEnumerable<Postjob> PostJobEmployerDeleteAll(Postjob item);
        IEnumerable<Datajob> PostDetailJobAll(Datajob item);
        IEnumerable<Datajob> PostAlljobAll(Datajob item);
        IEnumerable<Apply> PostApplyAll(Apply item);
        IEnumerable<Datajob> PostNotificationUserAll(Datajob item);
        IEnumerable<Employer> PostNotificationEmployerAll(Employer item);
        IEnumerable<PermissionItemdata> PostPermissionGroupAll(PermissionItemdata item);
        Employer PostLoginAll(Employer item);
        Employer PostJobImageAll(string imageName, int dataid);
        Employer PostJobFileAll(string filename, int dataid);
        Employer PostIndexAll(Employer item);
        Employer PostInterviewOnly(Employer item);
        IEnumerable<Email> sentMail(Email items);
    }
}
