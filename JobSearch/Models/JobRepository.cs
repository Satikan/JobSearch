using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using POSMySQL.POSControl;
using MySql.Data.MySqlClient;
using System.Data;
using System.Net;
using System.Net.Mail;
using System.IO;
using System.Text;
using System.Configuration;
namespace JobSearch.Models
{
    public class JobRepository : IJobRepository
    {
        CDBUtil objDB = new CDBUtil();
        MySqlConnection objConn = new MySqlConnection();

        public IEnumerable<BusinessType> GetBusinessTypeAll()
        {
            objConn = objDB.EstablishConnection();
            List<BusinessType> business = new List<BusinessType>();
            string strSQL = "SELECT * FROM businesstype;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    BusinessType businessData = new BusinessType();

                    businessData.BusinessTypeID = Convert.ToInt32(dt.Rows[i]["BusinessTypeID"].ToString());
                    businessData.BusinessTypeName = dt.Rows[i]["BusinessTypeName"].ToString();

                    business.Add(businessData);
                }
            }
            return business.ToArray();
        }

        public IEnumerable<Province> GetProvinceAll()
        {
            objConn = objDB.EstablishConnection();
            List<Province> province = new List<Province>();
            string strSQL = "SELECT * FROM provinces WHERE LangID = 1 ORDER BY provincename;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Province ProvinceData = new Province();

                    ProvinceData.ProvinceID = Convert.ToInt32(dt.Rows[i]["ProvinceID"].ToString());
                    ProvinceData.ProvinceName = dt.Rows[i]["ProvinceName"].ToString();
                    province.Add(ProvinceData);
                }
            }
            return province.ToArray();
        }

        public IEnumerable<Gender> GetGenderAll()
        {
            objConn = objDB.EstablishConnection();
            List<Gender> gender = new List<Gender>();
            string strSQL = "SELECT * FROM gender;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Gender genderData = new Gender();

                    genderData.GenderID = Convert.ToInt32(dt.Rows[i]["GenderID"].ToString());
                    genderData.GenderName = dt.Rows[i]["GenderName"].ToString();
                    gender.Add(genderData);
                }
            }
            return gender.ToArray();
        }

        public IEnumerable<Status> GetStatusAll()
        {
            objConn = objDB.EstablishConnection();
            List<Status> status = new List<Status>();
            string strSQL = "SELECT * FROM statuss;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Status StatusData = new Status();

                    StatusData.StatusID = Convert.ToInt32(dt.Rows[i]["StatusID"].ToString());
                    StatusData.StatusName = dt.Rows[i]["StatusName"].ToString();
                    status.Add(StatusData);
                }
            }
            return status.ToArray();
        }

        public IEnumerable<Jobtype> GetJobtypeAll()
        {
            objConn = objDB.EstablishConnection();
            List<Jobtype> jobtype = new List<Jobtype>();
            string strSQL = "SELECT * FROM jobtype;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Jobtype JobtypeData = new Jobtype();

                    JobtypeData.JobTypeID = Convert.ToInt32(dt.Rows[i]["JobTypeID"].ToString());
                    JobtypeData.JobTypeName = dt.Rows[i]["JobTypeName"].ToString();
                    jobtype.Add(JobtypeData);
                }
            }
            return jobtype.ToArray();
        }

        public IEnumerable<Datajob> GetCooperativeAll()
        {
            objConn = objDB.EstablishConnection();
            List<Datajob> cooperative = new List<Datajob>();
            string strSQL = "SELECT * FROM postjob pj INNER JOIN datacompanyanduser dc ON dc.DataID = pj.DataID INNER JOIN provinces pv ON dc.ProvinceID = pv.ProvinceID WHERE JobTypeID = 1 AND pv.LangID = 1 AND pj.Deleted = 0;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Datajob cooperativeData = new Datajob();

                    cooperativeData.JobID = Convert.ToInt32(dt.Rows[i]["JobID"].ToString());
                    cooperativeData.JobTitle = dt.Rows[i]["JobTitle"].ToString();
                    cooperativeData.JobDescription = dt.Rows[i]["JobDescription"].ToString();
                    cooperativeData.Keyskills = dt.Rows[i]["Keyskills"].ToString();
                    cooperativeData.Salary = dt.Rows[i]["Salary"].ToString();
                    cooperativeData.NumberPosition = dt.Rows[i]["NumberPosition"].ToString();
                    cooperativeData.Qualification = dt.Rows[i]["Qualification"].ToString();
                    cooperativeData.JobTypeID = Convert.ToInt32(dt.Rows[i]["JobTypeID"].ToString());
                    cooperativeData.Contactname = dt.Rows[i]["Contactname"].ToString();
                    cooperativeData.Position = dt.Rows[i]["Position"].ToString();
                    cooperativeData.Email = dt.Rows[i]["Email"].ToString();
                    cooperativeData.Telephone = dt.Rows[i]["Telephone"].ToString();
                    cooperativeData.DateRange = dt.Rows[i]["DateRange"].ToString();
                    cooperativeData.Companyname = dt.Rows[i]["Companyname"].ToString();
                    cooperativeData.EmployerAddress = dt.Rows[i]["EmployerAddress"].ToString();
                    cooperativeData.ProvinceName = dt.Rows[i]["ProvinceName"].ToString();
                    cooperativeData.District = dt.Rows[i]["District"].ToString();
                    cooperativeData.SubDistrict = dt.Rows[i]["SubDistrict"].ToString();
                    cooperativeData.Postcode = dt.Rows[i]["Postcode"].ToString();
                    cooperativeData.Website = dt.Rows[i]["Website"].ToString();

                    cooperative.Add(cooperativeData);
                }
            }
            return cooperative.ToArray();
        }

        public IEnumerable<Datajob> GetInternshipAll()
        {
            objConn = objDB.EstablishConnection();
            List<Datajob> internship = new List<Datajob>();
            string strSQL = "SELECT * FROM postjob pj INNER JOIN datacompanyanduser dc ON dc.DataID = pj.DataID INNER JOIN provinces pv ON dc.ProvinceID = pv.ProvinceID WHERE JobTypeID = 2 AND pv.LangID = 1;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Datajob internshipData = new Datajob();

                    internshipData.JobID = Convert.ToInt32(dt.Rows[i]["JobID"].ToString());
                    internshipData.JobTitle = dt.Rows[i]["JobTitle"].ToString();
                    internshipData.JobDescription = dt.Rows[i]["JobDescription"].ToString();
                    internshipData.Keyskills = dt.Rows[i]["Keyskills"].ToString();
                    internshipData.Salary = dt.Rows[i]["Salary"].ToString();
                    internshipData.NumberPosition = dt.Rows[i]["NumberPosition"].ToString();
                    internshipData.Qualification = dt.Rows[i]["Qualification"].ToString();
                    internshipData.JobTypeID = Convert.ToInt32(dt.Rows[i]["JobTypeID"].ToString());
                    internshipData.Contactname = dt.Rows[i]["Contactname"].ToString();
                    internshipData.Position = dt.Rows[i]["Position"].ToString();
                    internshipData.Email = dt.Rows[i]["Email"].ToString();
                    internshipData.Telephone = dt.Rows[i]["Telephone"].ToString();
                    internshipData.DateRange = dt.Rows[i]["DateRange"].ToString();
                    internshipData.Companyname = dt.Rows[i]["Companyname"].ToString();
                    internshipData.EmployerAddress = dt.Rows[i]["EmployerAddress"].ToString();
                    internshipData.ProvinceName = dt.Rows[i]["ProvinceName"].ToString();
                    internshipData.District = dt.Rows[i]["District"].ToString();
                    internshipData.SubDistrict = dt.Rows[i]["SubDistrict"].ToString();
                    internshipData.Postcode = dt.Rows[i]["Postcode"].ToString();
                    internshipData.Website = dt.Rows[i]["Website"].ToString();

                    internship.Add(internshipData);
                }
            }
            return internship.ToArray();
        }

        public Datajob GetJobOnlyAll(int id)
        {
            objConn = objDB.EstablishConnection();
            Datajob jobDataOnly = new Datajob();
            string strSQL = "SELECT * FROM postjob WHERE JobID = " + id + ";";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            jobDataOnly.JobID = Convert.ToInt32(dt.Rows[0]["JobID"].ToString());
            jobDataOnly.DataID = Convert.ToInt32(dt.Rows[0]["DataID"].ToString());
            jobDataOnly.JobTitle = dt.Rows[0]["JobTitle"].ToString();
            jobDataOnly.JobDescription = dt.Rows[0]["JobDescription"].ToString();
            jobDataOnly.Keyskills = dt.Rows[0]["Keyskills"].ToString();
            jobDataOnly.Salary = dt.Rows[0]["Salary"].ToString();
            jobDataOnly.NumberPosition = dt.Rows[0]["NumberPosition"].ToString();
            jobDataOnly.Qualification = dt.Rows[0]["Qualification"].ToString();
            jobDataOnly.JobTypeID = Convert.ToInt32(dt.Rows[0]["JobTypeID"].ToString());
            jobDataOnly.Contactname = dt.Rows[0]["Contactname"].ToString();
            jobDataOnly.Position = dt.Rows[0]["Position"].ToString();
            jobDataOnly.Email = dt.Rows[0]["Email"].ToString();
            jobDataOnly.Telephone = dt.Rows[0]["Telephone"].ToString();
            jobDataOnly.DateRange = dt.Rows[0]["DateRange"].ToString();
            jobDataOnly.ClosingDate = dt.Rows[0]["ClosingDate"].ToString();

            return jobDataOnly;
        }

        public Employer GetUserOnly(int id)
        {
            objConn = objDB.EstablishConnection();
            Employer userDataOnly = new Employer();
            string strSQL = "SELECT *, CONCAT(dc.Firstname,' ', dc.Lastname) AS NameUser FROM datacompanyanduser dc INNER JOIN Role r ON r.RoleID = dc.RoleID INNER JOIN Provinces p ON p.ProvinceID = dc.ProvinceID INNER JOIN Gender g ON g.GenderID = dc.GenderID INNER JOIN statuss s ON s.StatusID = dc.StatusID WHERE DataID = " + id + " AND p.LangID = 1 ORDER BY DataID;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            userDataOnly.DataID = Convert.ToInt32(dt.Rows[0]["DataID"].ToString());
            userDataOnly.Username = dt.Rows[0]["Username"].ToString();
            userDataOnly.RoleID = Convert.ToInt32(dt.Rows[0]["RoleID"].ToString());
            userDataOnly.Firstname = dt.Rows[0]["Firstname"].ToString();
            userDataOnly.Lastname = dt.Rows[0]["Lastname"].ToString();
            userDataOnly.GenderID = Convert.ToInt32(dt.Rows[0]["GenderID"].ToString());
            userDataOnly.GenderName = dt.Rows[0]["GenderName"].ToString();
            userDataOnly.StatusID = Convert.ToInt32(dt.Rows[0]["StatusID"].ToString());
            userDataOnly.StatusName = dt.Rows[0]["StatusName"].ToString();
            userDataOnly.Education = dt.Rows[0]["Education"].ToString();
            userDataOnly.Specialskill = dt.Rows[0]["Specialskill"].ToString();
            userDataOnly.Position = dt.Rows[0]["Position"].ToString();
            userDataOnly.Companyname = dt.Rows[0]["Companyname"].ToString();
            userDataOnly.BusinessTypeID = Convert.ToInt32(dt.Rows[0]["BusinessTypeID"].ToString());
            userDataOnly.EmployerAddress = dt.Rows[0]["EmployerAddress"].ToString();
            userDataOnly.Domicile = dt.Rows[0]["Domicile"].ToString();
            userDataOnly.PresentAddress = dt.Rows[0]["PresentAddress"].ToString();
            userDataOnly.District = dt.Rows[0]["District"].ToString();
            userDataOnly.SubDistrict = dt.Rows[0]["SubDistrict"].ToString();
            userDataOnly.ProvinceID = Convert.ToInt32(dt.Rows[0]["ProvinceID"].ToString());
            userDataOnly.ProvinceName = dt.Rows[0]["ProvinceName"].ToString();
            userDataOnly.Postcode = dt.Rows[0]["Postcode"].ToString();
            userDataOnly.Website = dt.Rows[0]["Website"].ToString();
            userDataOnly.PictureName = dt.Rows[0]["PictureName"].ToString();
            userDataOnly.FileResume = dt.Rows[0]["FileResume"].ToString();
            userDataOnly.Email = dt.Rows[0]["Email"].ToString();
            userDataOnly.Telephone = dt.Rows[0]["Telephone"].ToString();

            return userDataOnly;
        }

        public Employer GetEmployerOnly(int id)
        {
            objConn = objDB.EstablishConnection();
            Employer EmployerDataOnly = new Employer();
            string strSQL = "SELECT * FROM datacompanyanduser dc INNER JOIN Role r ON r.RoleID = dc.RoleID INNER JOIN Provinces p ON p.ProvinceID = dc.ProvinceID INNER JOIN Businesstype b ON b.BusinessTypeID = dc.BusinessTypeID WHERE DataID = " + id + " AND p.LangID = 1 ORDER BY DataID;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            EmployerDataOnly.DataID = Convert.ToInt32(dt.Rows[0]["DataID"].ToString());
            EmployerDataOnly.RoleID = Convert.ToInt32(dt.Rows[0]["RoleID"].ToString());
            EmployerDataOnly.Username = dt.Rows[0]["Username"].ToString();
            EmployerDataOnly.Firstname = dt.Rows[0]["Firstname"].ToString();
            EmployerDataOnly.Lastname = dt.Rows[0]["Lastname"].ToString();
            EmployerDataOnly.Education = dt.Rows[0]["Education"].ToString();
            EmployerDataOnly.Specialskill = dt.Rows[0]["Specialskill"].ToString();
            EmployerDataOnly.Position = dt.Rows[0]["Position"].ToString();
            EmployerDataOnly.Companyname = dt.Rows[0]["Companyname"].ToString();
            EmployerDataOnly.BusinessTypeID = Convert.ToInt32(dt.Rows[0]["BusinessTypeID"].ToString());
            EmployerDataOnly.BusinessTypeName = dt.Rows[0]["BusinessTypeName"].ToString();
            EmployerDataOnly.EmployerAddress = dt.Rows[0]["EmployerAddress"].ToString();
            EmployerDataOnly.Domicile = dt.Rows[0]["Domicile"].ToString();
            EmployerDataOnly.PresentAddress = dt.Rows[0]["PresentAddress"].ToString();
            EmployerDataOnly.District = dt.Rows[0]["District"].ToString();
            EmployerDataOnly.SubDistrict = dt.Rows[0]["SubDistrict"].ToString();
            EmployerDataOnly.ProvinceID = Convert.ToInt32(dt.Rows[0]["ProvinceID"].ToString());
            EmployerDataOnly.ProvinceName = dt.Rows[0]["ProvinceName"].ToString();
            EmployerDataOnly.Postcode = dt.Rows[0]["Postcode"].ToString();
            EmployerDataOnly.Website = dt.Rows[0]["Website"].ToString();
            EmployerDataOnly.PictureName = dt.Rows[0]["PictureName"].ToString();
            EmployerDataOnly.FileResume = dt.Rows[0]["FileResume"].ToString();
            EmployerDataOnly.Email = dt.Rows[0]["Email"].ToString();
            EmployerDataOnly.Telephone = dt.Rows[0]["Telephone"].ToString();

            return EmployerDataOnly;
        }

        public IEnumerable<Employer> GetApplicantAll(int id)
        {
            objConn = objDB.EstablishConnection();
            List<Employer> applicant = new List<Employer>();
            string strSQL = "SELECT a.ApplyID, a.DataID, dc.Firstname, dc.Lastname, dc.GenderID, dc.FileResume, dc.Email FROM datacompanyanduser dc INNER JOIN Apply a ON a.DataID = dc.DataID WHERE a.JobID = " + id + " AND a.Deleted = 0 ORDER BY a.DataID;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Employer applicantData = new Employer();

                    applicantData.ApplyID = Convert.ToInt32(dt.Rows[i]["ApplyID"].ToString());
                    applicantData.DataID = Convert.ToInt32(dt.Rows[i]["DataID"].ToString());
                    applicantData.Firstname = dt.Rows[i]["Firstname"].ToString();
                    applicantData.Lastname = dt.Rows[i]["Lastname"].ToString();
                    applicantData.GenderID = Convert.ToInt32(dt.Rows[i]["GenderID"].ToString());
                    applicantData.FileResume = dt.Rows[i]["FileResume"].ToString();
                    applicantData.Email = dt.Rows[i]["Email"].ToString();

                    applicant.Add(applicantData);
                }
            }
            return applicant.ToArray();
        }

        public IEnumerable<Employer> PostEmployerAll(Employer item)
        {
            objConn = objDB.EstablishConnection();
            List<Employer> employer = new List<Employer>();

            int rowid;
            string province;
            string provincename;

            string strSQL1 = "SELECT MAX(DataID) AS rowid FROM datacompanyanduser;";
            DataTable dt = objDB.List(strSQL1, objConn);
            rowid = Convert.ToInt32(dt.Rows[0]["rowid"].ToString());
            int maxid = rowid + 1;

            if (item.ProvinceID == 0)
            {
                provincename = null;
            }
            else
            {
                string strSQL3 = "SELECT ProvinceName FROM provinces WHERE ProvinceID = '" + item.ProvinceID + "' AND LangID = 1 ;";
                DataTable dt3 = objDB.List(strSQL3, objConn);
                province = dt3.Rows[0]["ProvinceName"].ToString();
                provincename = province;
            }

            string strSQL2 = "INSERT INTO datacompanyanduser(DataID, Username, Password, RoleID, Firstname, Lastname, Companyname, BusinessTypeID, EmployerAddress, Domicile, PresentAddress, GenderID, District, SubDistrict, ProvinceID, Postcode, Website, Telephone, PictureName, Email, StatusID, Education, Specialskill, Position) ";
            strSQL2 += "VALUES ('" + maxid + "','" + item.Username + "', SHA1('" + item.Password + "'),'" + item.RoleID + "','" + item.Firstname + "','" + item.Lastname + "','" + item.Companyname + "','" + item.BusinessTypeID + "','" + item.EmployerAddress + "','" + item.Domicile + "','" + item.PresentAddress + "','" + item.GenderID + "','" + item.District + "','" + item.SubDistrict + "','" + item.ProvinceID + "','" + item.Postcode + "','" + item.Website + "','" + item.Telephone + "','" + item.PictureName + "','" + item.Email + "','" + item.StatusID + "','" + item.Education + "','" + item.Specialskill + "','" + item.Position + "')";

            objDB.sqlExecute(strSQL2, objConn);
            objConn.Close();

            return employer.ToArray();
        }

        public IEnumerable<Employer> PostEditProfileEmployerAll(Employer item)
        {
            objConn = objDB.EstablishConnection();
            List<Employer> posteditemployer = new List<Employer>();

            string strSQL = "UPDATE datacompanyanduser SET Companyname = '" + item.Companyname + "', BusinessTypeID = '" + item.BusinessTypeID + "', EmployerAddress = '" + item.EmployerAddress + "', ProvinceID = '" + item.ProvinceID + "', District = '" + item.District + "', SubDistrict = '" + item.SubDistrict + "', Postcode = '" + item.Postcode + "', Website = '" + item.Website + "'";
            strSQL += "WHERE DataID = '" + item.DataID + "';";

            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return posteditemployer.ToArray();
        }

        public IEnumerable<Employer> PostSeekerAll(Employer item)
        {
            objConn = objDB.EstablishConnection();
            List<Employer> seeker = new List<Employer>();

            int rowid;
            string province;
            string provincename;

            string strSQL1 = "SELECT MAX(DataID) AS rowid FROM datacompanyanduser;";
            DataTable dt = objDB.List(strSQL1, objConn);
            rowid = Convert.ToInt32(dt.Rows[0]["rowid"].ToString());
            int maxid = rowid + 1;

            if (item.ProvinceID == 0)
            {
                provincename = null;
            }
            else
            {
                string strSQL3 = "SELECT ProvinceName FROM provinces WHERE ProvinceID = '" + item.ProvinceID + "' AND LangID = 1 ;";
                DataTable dt3 = objDB.List(strSQL3, objConn);
                province = dt3.Rows[0]["ProvinceName"].ToString();
                provincename = province;
            }

            string strSQL2 = "INSERT INTO datacompanyanduser(DataID, Username, Password, RoleID, Firstname, Lastname, Companyname, BusinessTypeID, EmployerAddress, Domicile, PresentAddress, GenderID, District, SubDistrict, ProvinceID, Postcode, Website, Telephone, PictureName, Email, StatusID, Education, Specialskill, Position) ";
            strSQL2 += "VALUES ('" + maxid + "','" + item.Username + "', SHA1('" + item.Password + "'),'" + item.RoleID + "','" + item.Firstname + "','" + item.Lastname + "','" + item.Companyname + "','" + item.BusinessTypeID + "','" + item.EmployerAddress + "','" + item.Domicile + "','" + item.PresentAddress + "','" + item.GenderID + "','" + item.District + "','" + item.SubDistrict + "','" + item.ProvinceID + "','" + item.Postcode + "','" + item.Website + "','" + item.Telephone + "','" + item.PictureName + "','" + item.Email + "','" + item.StatusID + "','" + item.Education + "','" + item.Specialskill + "','" + item.Position + "')";

            objDB.sqlExecute(strSQL2, objConn);
            objConn.Close();

            return seeker.ToArray();
        }

        public IEnumerable<Postjob> PostPostjobAll(Postjob item)
        {
            objConn = objDB.EstablishConnection();
            List<Postjob> postjob = new List<Postjob>();

            int rowid;

            string strSQL1 = "SELECT MAX(JobID) AS rowid FROM postjob;";
            DataTable dt = objDB.List(strSQL1, objConn);
            rowid = Convert.ToInt32(dt.Rows[0]["rowid"].ToString());
            int maxid = rowid + 1;

            string strSQL2 = "INSERT INTO postjob(JobID, DataID, JobTitle, JobDescription, Keyskills, Salary, NumberPosition, Qualification, JobTypeID, Contactname, Position, Email, Telephone, DateRange, DateStart, ClosingDate) ";
            strSQL2 += "VALUES ('" + maxid + "','" + item.DataID + "' , '" + item.JobTitle + "', '" + item.JobDescription + "','" + item.Keyskills + "','" + item.Salary + "','" + item.NumberPosition + "','" + item.Qualification + "','" + item.JobTypeID + "','" + item.Contactname + "','" + item.Position + "','" + item.Email + "','" + item.Telephone + "','" + item.DateRange + "','" + item.DateStart + "','" + item.ClosingDate + "')";

            objDB.sqlExecute(strSQL2, objConn);
            objConn.Close();

            return postjob.ToArray();
        }

        public IEnumerable<Apply> PostApplyCoopAll(Apply item)
        {
            objConn = objDB.EstablishConnection();
            List<Apply> postjob = new List<Apply>();

            int rowid;

            string strSQL1 = "SELECT MAX(ApplyID) AS rowid FROM apply;";
            DataTable dt = objDB.List(strSQL1, objConn);
            rowid = Convert.ToInt32(dt.Rows[0]["rowid"].ToString());
            int maxid = rowid + 1;

            string strSQL2 = "INSERT INTO apply(ApplyID, DataID, JobID) ";
            strSQL2 += "VALUES ('" + maxid + "','" + item.DataID + "', '" + item.JobID + "')";

            objDB.sqlExecute(strSQL2, objConn);
            objConn.Close();

            return postjob.ToArray();
        }

        public IEnumerable<Postjob> PostPostEditjobAll(Postjob item)
        {
            objConn = objDB.EstablishConnection();
            List<Postjob> posteditjob = new List<Postjob>();

            string strSQL = "UPDATE postjob SET DataID = '" + item.DataID + "', JobTitle = '" + item.JobTitle + "', JobDescription = '" + item.JobDescription + "', Keyskills = '" + item.Keyskills + "', Salary = '" + item.Salary + "', NumberPosition = '" + item.NumberPosition + "', Qualification = '" + item.Qualification + "', JobTypeID = '" + item.JobTypeID + "', Contactname = '" + item.Contactname + "', Position = '" + item.Position + "', Email = '" + item.Email + "', Telephone = '" + item.Telephone + "', DateRange = '" + item.DateRange + "', ClosingDate = '" + item.ClosingDate +"'";
            strSQL += "WHERE JobID = '" + item.JobID + "';";

            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return posteditjob.ToArray();
        }

        public IEnumerable<Datajob> PostDetailJobAll(Datajob item)
        {
            objConn = objDB.EstablishConnection();
            List<Datajob> jobdetail = new List<Datajob>();
            string strSQL = "SELECT * FROM postjob pj INNER JOIN datacompanyanduser dc ON dc.DataID = pj.DataID INNER JOIN provinces pv ON dc.ProvinceID = pv.ProvinceID WHERE pj.JobID = " + item.JobID + " AND pv.LangID = 1;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Datajob alljobdetail = new Datajob();

                    alljobdetail.JobID = Convert.ToInt32(dt.Rows[i]["JobID"].ToString());
                    alljobdetail.JobTitle = dt.Rows[i]["JobTitle"].ToString();
                    alljobdetail.JobDescription = dt.Rows[i]["JobDescription"].ToString();
                    alljobdetail.Keyskills = dt.Rows[i]["Keyskills"].ToString();
                    alljobdetail.Salary = dt.Rows[i]["Salary"].ToString();
                    alljobdetail.NumberPosition = dt.Rows[i]["NumberPosition"].ToString();
                    alljobdetail.Qualification = dt.Rows[i]["Qualification"].ToString();
                    alljobdetail.JobTypeID = Convert.ToInt32(dt.Rows[i]["JobTypeID"].ToString());
                    alljobdetail.Contactname = dt.Rows[i]["Contactname"].ToString();
                    alljobdetail.Position = dt.Rows[i]["Position"].ToString();
                    alljobdetail.Email = dt.Rows[i]["Email"].ToString();
                    alljobdetail.Telephone = dt.Rows[i]["Telephone"].ToString();
                    alljobdetail.DateRange = dt.Rows[i]["DateRange"].ToString();
                    alljobdetail.Companyname = dt.Rows[i]["Companyname"].ToString();
                    alljobdetail.EmployerAddress = dt.Rows[i]["EmployerAddress"].ToString();
                    alljobdetail.ProvinceName = dt.Rows[i]["ProvinceName"].ToString();
                    alljobdetail.District = dt.Rows[i]["District"].ToString();
                    alljobdetail.SubDistrict = dt.Rows[i]["SubDistrict"].ToString();
                    alljobdetail.Postcode = dt.Rows[i]["Postcode"].ToString();
                    alljobdetail.Website = dt.Rows[i]["Website"].ToString();

                    jobdetail.Add(alljobdetail);
                }
            }
            return jobdetail.ToArray();
        }

        public IEnumerable<Employer> PostNotificationEmployerAll(Employer item)
        {
            objConn = objDB.EstablishConnection();
            List<Employer> notification = new List<Employer>();
            string strSQL = "SELECT a.ApplyID, a.DataID, dc.Firstname, dc.Lastname, dc.GenderID, dc.FileResume, dc.Email, dc.PictureName, p.JobTitle FROM datacompanyanduser dc INNER JOIN Apply a ON a.DataID = dc.DataID INNER JOIN postjob p ON p.JobID = a.JobID WHERE p.DataID = '" + item.DataID + "' AND a.Deleted = 0 AND a.Hide = 0 ORDER BY a.DataID;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Employer notificationData = new Employer();

                    notificationData.ApplyID = Convert.ToInt32(dt.Rows[i]["ApplyID"].ToString());
                    notificationData.DataID = Convert.ToInt32(dt.Rows[i]["DataID"].ToString());
                    notificationData.Firstname = dt.Rows[i]["Firstname"].ToString();
                    notificationData.Lastname = dt.Rows[i]["Lastname"].ToString();
                    notificationData.GenderID = Convert.ToInt32(dt.Rows[i]["GenderID"].ToString());
                    notificationData.FileResume = dt.Rows[i]["FileResume"].ToString();
                    notificationData.PictureName = dt.Rows[i]["PictureName"].ToString();
                    notificationData.JobTitle = dt.Rows[i]["JobTitle"].ToString();
                    notificationData.Email = dt.Rows[i]["Email"].ToString();

                    notification.Add(notificationData);
                }
            }
            return notification.ToArray();
        }

        public IEnumerable<Postjob> PostJobDeleteAll(Postjob item)
        {
            objConn = objDB.EstablishConnection();
            List<Postjob> jobdelete = new List<Postjob>();

            string strSQL = "UPDATE postjob SET Deleted = '" + item.Deleted + "'";
            strSQL += "WHERE JobID = '" + item.JobID + "';";
            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return jobdelete;
        }

        public IEnumerable<Apply> PostApplyCancleAll(Apply item)
        {
            objConn = objDB.EstablishConnection();
            List<Apply> applycancle = new List<Apply>();

            string strSQL = "UPDATE apply SET Deleted = '" + item.Deleted + "'";
            strSQL += "WHERE ApplyID = '" + item.ApplyID + "';";
            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return applycancle;
        }

        public IEnumerable<Apply> PostCountHideAll(Apply item)
        {
            objConn = objDB.EstablishConnection();
            List<Apply> CountHide = new List<Apply>();

            string strSQL = "UPDATE apply SET Hide = '" + item.Hide + "'";
            strSQL += "WHERE ApplyID = '" + item.ApplyID + "';";
            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return CountHide;
        }

        public IEnumerable<Postjob> PostJobEmployerDeleteAll(Postjob item)
        {
            objConn = objDB.EstablishConnection();
            List<Postjob> jobemdelete = new List<Postjob>();

            string strSQL = "UPDATE postjob SET Deleted = '" + item.Deleted + "'";
            strSQL += "WHERE JobID = '" + item.JobID + "';";
            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return jobemdelete;
        }

        public Employer PostInterviewOnly(Employer item)
        {
            objConn = objDB.EstablishConnection();
            Employer interview = new Employer();

            string strSQL = "SELECT DataID, Email FROM datacompanyanduser WHERE DataID = '" + item.DataID + "';";
            objDB.sqlExecute(strSQL, objConn);
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            interview.DataID = Convert.ToInt32(dt.Rows[0]["DataID"].ToString());
            interview.Email = dt.Rows[0]["Email"].ToString();

            return interview;
        }

        public IEnumerable<Datajob> PostAlljobAll(Datajob item)
        {
            objConn = objDB.EstablishConnection();
            List<Datajob> alljob = new List<Datajob>();
            string strSQL = "SELECT * FROM postjob pj INNER JOIN datacompanyanduser dc ON dc.DataID = pj.DataID INNER JOIN provinces pv ON dc.ProvinceID = pv.ProvinceID WHERE pj.DataID = " + item.DataID + " AND pv.LangID = 1 AND pj.Deleted = 0;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Datajob alljobData = new Datajob();

                    alljobData.JobID = Convert.ToInt32(dt.Rows[i]["JobID"].ToString());
                    alljobData.JobTitle = dt.Rows[i]["JobTitle"].ToString();
                    alljobData.JobDescription = dt.Rows[i]["JobDescription"].ToString();
                    alljobData.Keyskills = dt.Rows[i]["Keyskills"].ToString();
                    alljobData.Salary = dt.Rows[i]["Salary"].ToString();
                    alljobData.NumberPosition = dt.Rows[i]["NumberPosition"].ToString();
                    alljobData.Qualification = dt.Rows[i]["Qualification"].ToString();
                    alljobData.JobTypeID = Convert.ToInt32(dt.Rows[i]["JobTypeID"].ToString());
                    alljobData.Contactname = dt.Rows[i]["Contactname"].ToString();
                    alljobData.Position = dt.Rows[i]["Position"].ToString();
                    alljobData.Email = dt.Rows[i]["Email"].ToString();
                    alljobData.Telephone = dt.Rows[i]["Telephone"].ToString();
                    alljobData.DateRange = dt.Rows[i]["DateRange"].ToString();
                    alljobData.Companyname = dt.Rows[i]["Companyname"].ToString();
                    alljobData.EmployerAddress = dt.Rows[i]["EmployerAddress"].ToString();
                    alljobData.ProvinceName = dt.Rows[i]["ProvinceName"].ToString();
                    alljobData.District = dt.Rows[i]["District"].ToString();
                    alljobData.SubDistrict = dt.Rows[i]["SubDistrict"].ToString();
                    alljobData.Postcode = dt.Rows[i]["Postcode"].ToString();
                    alljobData.Website = dt.Rows[i]["Website"].ToString();

                    alljob.Add(alljobData);
                }
            }
            return alljob.ToArray();
        }

        public Employer PostIndexAll(Employer item)
        {
            objConn = objDB.EstablishConnection();
            Employer userData = new Employer();
            string strSQL = "SELECT *, CONCAT(dc.Firstname,' ', dc.Lastname) AS NameUser FROM datacompanyanduser dc INNER JOIN Role r ON r.RoleID = dc.RoleID INNER JOIN Provinces p ON p.ProvinceID = dc.ProvinceID WHERE DataID = " + item.DataID + " AND p.LangID = 1 ORDER BY DataID;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();

            userData.DataID = Convert.ToInt32(dt.Rows[0]["DataID"].ToString());
            userData.Username = dt.Rows[0]["Username"].ToString();
            userData.RoleID = Convert.ToInt32(dt.Rows[0]["RoleID"].ToString());
            userData.Firstname = dt.Rows[0]["Firstname"].ToString();
            userData.Lastname = dt.Rows[0]["Lastname"].ToString();
            userData.GenderID = Convert.ToInt32(dt.Rows[0]["GenderID"].ToString());
            userData.StatusID = Convert.ToInt32(dt.Rows[0]["StatusID"].ToString());
            userData.Education = dt.Rows[0]["Education"].ToString();
            userData.Specialskill = dt.Rows[0]["Specialskill"].ToString();
            userData.Position = dt.Rows[0]["Position"].ToString();
            userData.Companyname = dt.Rows[0]["Companyname"].ToString();
            userData.BusinessTypeID = Convert.ToInt32(dt.Rows[0]["BusinessTypeID"].ToString());
            userData.EmployerAddress = dt.Rows[0]["EmployerAddress"].ToString();
            userData.Domicile = dt.Rows[0]["Domicile"].ToString();
            userData.PresentAddress = dt.Rows[0]["PresentAddress"].ToString();
            userData.District = dt.Rows[0]["District"].ToString();
            userData.SubDistrict = dt.Rows[0]["SubDistrict"].ToString();
            userData.ProvinceID = Convert.ToInt32(dt.Rows[0]["ProvinceID"].ToString());
            userData.ProvinceName = dt.Rows[0]["ProvinceName"].ToString();
            userData.Postcode = dt.Rows[0]["Postcode"].ToString();
            userData.Website = dt.Rows[0]["Website"].ToString();
            userData.PictureName = dt.Rows[0]["PictureName"].ToString();
            userData.Email = dt.Rows[0]["Email"].ToString();
            userData.Telephone = dt.Rows[0]["Telephone"].ToString();

            return userData;
        }

        public IEnumerable<PermissionItemdata> PostPermissionGroupAll(PermissionItemdata item)
        {
            objConn = objDB.EstablishConnection();
            List<PermissionItemdata> manage = new List<PermissionItemdata>();
            string strSQL = "SELECT pg.PermissionGroupID, pg.PermissionGroupName FROM permissionitems pt ";
            strSQL += "INNER JOIN permissiongroup pg ON pg.PermissionGroupID = pt.PermissionGroupID ";
            strSQL += "LEFT JOIN access sa ON sa.PermissionItemID = pt.PermissionItemID ";
            strSQL += "WHERE pt.PermissionItemParent = 0 AND pt.Deleted = 0 AND sa.RoleID = '" + item.RoleID + "' ";
            strSQL += "GROUP BY sa.RoleID, pt.PermissionGroupID ORDER BY sa.RoleID, pt.PermissionGroupID, pt.PermissionItemID;";
            string strSQLitem = "SELECT pg.PermissionGroupID, pt.PermissionItemUrl, pt.PermissionItemID, pt.PermissionItemName, pt.PermissionItemIcon FROM permissionitems pt ";
            strSQLitem += "INNER JOIN permissiongroup pg ON pg.PermissionGroupID = pt.PermissionGroupID ";
            strSQLitem += "LEFT JOIN access sa ON sa.PermissionItemID = pt.PermissionItemID ";
            strSQLitem += "WHERE pt.PermissionItemParent = 0 AND pt.Deleted = 0 AND sa.RoleID = '" + item.RoleID + "' ";
            strSQLitem += "GROUP BY pt.PermissionItemID;";

            DataTable dt = objDB.List(strSQL, objConn);
            DataTable dtitem = objDB.List(strSQLitem, objConn);
            objConn.Close();

            if (dt.Rows.Count > 0)
            {
                // Create Main Array

                // Create Object

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    PermissionItemdata manageStaff = new PermissionItemdata();
                    manageStaff.GroupName = Convert.ToString(dt.Rows[i]["PermissionGroupName"]);
                    // Add Group Name AS String

                    DataRow[] dr = dtitem.Select(" PermissionGroupID = " + dt.Rows[i]["PermissionGroupID"].ToString());

                    // Add Group Parent AS Array
                    List<PermissionItemParent> manageParent = new List<PermissionItemParent>();

                    if (dr.Length > 0)
                    {
                        for (int j = 0; j < dr.Length; j++)
                        {
                            PermissionItemParent manageStaffparent = new PermissionItemParent();
                            // Add Object PermissionGroupID
                            manageStaffparent.PermissionGroupID = Convert.ToString(dr[j]["PermissionGroupID"]);
                            // Add Object PermissionItemUrl
                            manageStaffparent.PermissionItemUrl = Convert.ToString(dr[j]["PermissionItemUrl"]);
                            // Add Object PermissionItemID
                            manageStaffparent.PermissionItemID = Convert.ToString(dr[j]["PermissionItemID"]);
                            // Add Object PermissionItemName
                            manageStaffparent.PermissionItemName = Convert.ToString(dr[j]["PermissionItemName"]);

                            manageStaffparent.PermissionItemIcon = Convert.ToString(dr[j]["PermissionItemIcon"]);

                            manageParent.Add(manageStaffparent);
                        }
                    }
                    manageStaff.GroupParent = manageParent;
                    manage.Add(manageStaff);
                }
            }
            return manage.ToArray();
        }

        public Employer PostLoginAll(Employer item)
        {
            objConn = objDB.EstablishConnection();
            Employer login = new Employer();
            string strSQL = "SELECT * FROM datacompanyanduser dc INNER JOIN role r ON r.RoleID = dc.RoleID WHERE dc.Username = '" + item.Username + "' AND dc.Password = sha1('" + item.Password + "') OR dc.Email = '" + item.Username + "' AND dc.Password = sha1('" + item.Password + "'); ";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                login.DataID = Convert.ToInt32(dt.Rows[0]["DataID"].ToString());
                login.Username = dt.Rows[0]["Username"].ToString();
                login.RoleID = Convert.ToInt32(dt.Rows[0]["RoleID"].ToString());
                login.Firstname = dt.Rows[0]["Firstname"].ToString();
                login.Lastname = dt.Rows[0]["Lastname"].ToString();
                login.Companyname = dt.Rows[0]["Companyname"].ToString();
                login.PictureName = dt.Rows[0]["PictureName"].ToString();
                login.Email = dt.Rows[0]["Email"].ToString();
                login.status = "true";

            }
            else
            {
                login.status = "false";

            }
            return login;
        }

        public Employer PostJobImageAll(string imageName, int dataid)
        {
            objConn = objDB.EstablishConnection();
            Employer jobimg = new Employer();

            string strSQL = "UPDATE datacompanyanduser SET PictureName = '" + imageName + "'";
            //strSQL += "WHERE StaffID = '" + StaffID + "';";
            strSQL += "WHERE DataID = '" + dataid + "';";
            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return jobimg;
        }

        public Employer PostJobFileAll(string filename, int dataid)
        {
            objConn = objDB.EstablishConnection();
            Employer jobfile = new Employer();

            string strSQL = "UPDATE datacompanyanduser SET FileResume = '" + filename + "'";
            //strSQL += "WHERE StaffID = '" + StaffID + "';";
            strSQL += "WHERE DataID = '" + dataid + "';";
            objDB.sqlExecute(strSQL, objConn);
            objConn.Close();

            return jobfile;
        }

        public IEnumerable<Email> sentMail(Email items)
        {
            objConn = objDB.EstablishConnection();
            List<Email> sentMail = new List<Email>();

            string sqlEmail = "SELECT DataID, Email FROM datacompanyanduser WHERE DataID = '" + items.DataID + "';";
            DataTable dtSentMail = objDB.List(sqlEmail, objConn);
            objConn.Close();

            //string hostAddr = ConfigurationManager.AppSettings["Host"].ToString();
            //string mailAuthen = ConfigurationManager.AppSettings["MailAuthen"].ToString();
            //string passAuthen = ConfigurationManager.AppSettings["PassAuthen"].ToString();
            string EmailTo = dtSentMail.Rows[0]["Email"].ToString();

            try
            {
                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(items.EmailFrom.ToString());

                mailMessage.Subject = items.Subject.ToString();
                mailMessage.Body = items.MessageInterview.ToString();
                mailMessage.IsBodyHtml = true;
                mailMessage.To.Add(items.EmailTo.ToString());


                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.live.com";
                smtp.EnableSsl = true;

                NetworkCredential networkCre = new NetworkCredential();
                networkCre.UserName = items.EmailFrom.ToString();
                networkCre.Password = items.PasswordEmailFrom.ToString();
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = networkCre;
                smtp.Timeout = 10000;
                smtp.Port = 587;

                smtp.Send(mailMessage);//ON ERROR
                Console.WriteLine("Message Sent");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message.ToString());
            }

            //MailMessage mail = new MailMessage(items.EmailFrom.ToString(), items.EmailTo.ToString());
            //SmtpClient client = new SmtpClient();
            //client.Port = 25;
            //client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //client.UseDefaultCredentials = false;
            //client.Host = "smtp.gmail.com";
            //mail.Subject = items.Subject.ToString();
            //mail.Body = items.MessageInterview.ToString();
            //client.Send(mail);

            return sentMail;
        }

    }
}