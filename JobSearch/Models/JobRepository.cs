using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using POSMySQL.POSControl;
using MySql.Data.MySqlClient;
using System.Data;
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
            string strSQL = "SELECT * FROM provinces WHERE LangID = 1;";
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
            string strSQL = "SELECT * FROM status;";
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
            string strSQL = "SELECT * FROM postjob pj INNER JOIN datacompanyanduser dc ON dc.DataID = pj.DataID INNER JOIN provinces pv ON dc.ProvinceID = pv.ProvinceID WHERE JobTypeID = 1 AND pv.LangID = 1;";
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

            string strSQL2 = "INSERT INTO postjob(JobID, JobTitle, JobDescription, Keyskills, Salary, NumberPosition, Qualification, JobTypeID, Contactname, Position, Email, Telephone, DateRange) ";
            strSQL2 += "VALUES ('" + maxid + "','" + item.JobTitle + "', '" + item.JobDescription + "','" + item.Keyskills + "','" + item.Salary + "','" + item.NumberPosition + "','" + item.Qualification + "','" + item.JobTypeID + "','" + item.Contactname + "','" + item.Position + "','" + item.Email + "','" + item.Telephone + "','" + item.DateRange + "')";

            objDB.sqlExecute(strSQL2, objConn);
            objConn.Close();

            return postjob.ToArray();
        }

        public IEnumerable<Datajob> PostAlljobAll(Datajob item)
        {
            objConn = objDB.EstablishConnection();
            List<Datajob> alljob = new List<Datajob>();
            string strSQL = "SELECT * FROM postjob pj INNER JOIN datacompanyanduser dc ON dc.DataID = pj.DataID INNER JOIN provinces pv ON dc.ProvinceID = pv.ProvinceID WHERE pj.DataID = " + item.DataID + " AND pv.LangID = 1;";
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

    }
}