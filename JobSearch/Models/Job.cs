﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace JobSearch.Models
{
    public class BusinessType
    {
        public int BusinessTypeID { get; set; }

        public string BusinessTypeName { get; set; }
    }

    public class Province
    {
        public int ProvinceID { get; set; }

        public string ProvinceName { get; set; }
    }

    public class Gender
    {
        public int GenderID { get; set; }

        public string GenderName { get; set; }
    }

    public class Status
    {
        public int StatusID { get; set; }

        public string StatusName { get; set; }
    }

    public class Jobtype
    {
        public int JobTypeID { get; set; }

        public string JobTypeName { get; set; }
    }

    public class Employer
    {
        public int DataID { get; set; }

        public int ApplyID { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }

        public int RoleID { get; set; }

        public string Firstname { get; set; }

        public string Lastname { get; set; }

        public string Companyname { get; set; }

        public int BusinessTypeID { get; set; }

        public string BusinessTypeName { get; set; }

        public string EmployerAddress { get; set; }

        public string Domicile { get; set; }

        public string PresentAddress { get; set; }

        public int GenderID { get; set; }

        public string GenderName { get; set; }

        public string District { get; set; }

        public string SubDistrict { get; set; }

        public int ProvinceID { get; set; }

        public string ProvinceName { get; set; }

        public string Postcode { get; set; }

        public string Website { get; set; }

        public string Telephone { get; set; }

        public string PictureName { get; set; }

        public string FileResume { get; set; }

        public string Email { get; set; }

        public int StatusID { get; set; }

        public string StatusName { get; set; }

        public string Education { get; set; }

        public string Specialskill { get; set; }

        public string Position { get; set; }

        public string JobTitle { get; set; }

        public int Count { get; set; }

        public string status { get; set; }
    }

    public class Postjob
    {
        public string Companyname { get; set; }

        public int JobID { get; set; }

        public int DataID { get; set; }

        public string JobTitle { get; set; }

        public string JobDescription { get; set; }

        public string Keyskills { get; set; }

        public string Salary { get; set; }

        public string NumberPosition { get; set; }

        public string Qualification { get; set; }

        public int JobTypeID { get; set; }

        public string Contactname { get; set; }

        public string Position { get; set; }

        public string EmployerAddress { get; set; }

        public string District { get; set; }

        public string SubDistrict { get; set; }

        public int ProvinceID { get; set; }

        public string ProvinceName { get; set; }

        public string Postcode { get; set; }

        public string Website { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string DateRange { get; set; }

        public string DateStart { get; set; }

        public string ClosingDate { get; set; }

        public int Deleted { get; set; }
    }

    public class Datajob
    {
        public int JobID { get; set; }

        public string JobTitle { get; set; }

        public string JobDescription { get; set; }

        public string Keyskills { get; set; }

        public string Salary { get; set; }

        public string NumberPosition { get; set; }

        public string Qualification { get; set; }

        public int JobTypeID { get; set; }

        public string Contactname { get; set; }

        public string Position { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string DateRange { get; set; }

        public string ClosingDate { get; set; }

        public int DataID { get; set; }

        public string Companyname { get; set; }

        public int BusinessTypeID { get; set; }

        public string EmployerAddress { get; set; }

        public string District { get; set; }

        public string SubDistrict { get; set; }

        public int ProvinceID { get; set; }

        public string ProvinceName { get; set; }

        public string Postcode { get; set; }

        public string Website { get; set; }

        public string PictureName { get; set; }

        public string status { get; set; }

        public int Hide { get; set; }
    }

    public class PermissionItemdata
    {
        public int RoleID { get; set; }

        public String GroupName { get; set; }

        public List<PermissionItemParent> GroupParent { get; set; }
    }

    public class PermissionItemParent
    {
        public string PermissionGroupID { get; set; }

        public string PermissionItemUrl { get; set; }

        public string PermissionItemID { get; set; }

        public string PermissionItemName { get; set; }

        public string PermissionItemIcon { get; set; }
    }

    public class Apply
    {
        public int ApplyID { get; set; }

        public int DataID { get; set; }

        public int JobID { get; set; }

        public int Deleted { get; set; }

        public int Hide { get; set; }
    }

    public class Email
    {
        public int DataID { get; set; }

        public string EmailFrom { get; set; }

        public string PasswordEmailFrom { get; set; }

        public string EmailTo { get; set; }

        public string Subject { get; set; }

        public string MessageInterview { get; set; }
    }

}