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

        public IEnumerable<Job> GetJobAll()
        {
            objConn = objDB.EstablishConnection();
            List<Job> staff = new List<Job>();
            string strSQL = "SELECT * FROM job ;";
            DataTable dt = objDB.List(strSQL, objConn);
            objConn.Close();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Job staffData = new Job();

                    staffData.JobID = Convert.ToInt32(dt.Rows[i]["JobID"].ToString());
                    staffData.JobName = dt.Rows[i]["JobName"].ToString();
                    
                    staff.Add(staffData);
                }
            }
            return staff.ToArray();
        }
    }
}