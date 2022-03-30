using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Motto_Data.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Motto_Data.Controllers
{
    public class HomeController : Controller
    {
        SqlCommand com = new SqlCommand();
        SqlDataReader dr;
        SqlConnection con = new SqlConnection();
        List<Adress> adresses = new List<Adress>();
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            con.ConnectionString = Motto_Data.Properties.Resources.ConnectionString;
        }

        public IActionResult Index()
        {
            FetchData();
            return View(adresses);
        }
        private void FetchData()
        {
            if(adresses.Count > 0)
            {
                adresses.Clear();
            }
            try
            {
                con.Open();
                com.Connection = con;
                com.CommandText = "SELECT TOP (100) [AddressID],[AddressLine1],[City],[StateProvinceID],[PostalCode],[SpatialLocation],[rowguid],[ModifiedDate] FROM [AdventureWorks2019].[Person].[Address]";
                dr = com.ExecuteReader();
                while (dr.Read())
                {
                    adresses.Add(new Adress() { AddressID = dr["AddressID"].ToString()
                        , AddressLine = dr["AddressLine1"].ToString()
                        , City = dr["City"].ToString()
                        , StateProvinceID = dr["StateProvinceID"].ToString()
                        , PostalCode = dr["PostalCode"].ToString()
                        , SpatialLocation = dr["SpatialLocation"].ToString()
                        , RowID = dr["rowguid"].ToString()
                        , ModifiedDate = dr["ModifiedDate"].ToString()

                    });
                }
                con.Close();

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        public IActionResult Test()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
