using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public class Locations : ILocations
    {
        private readonly AppDbContext _context;

        public Locations(AppDbContext context)
        {
            _context = context;
        }

        public List<LocationModel> GetAllLocations()
        {
            var locations = _context.Locations.ToList();
            var model = new List<LocationModel>();

            if(locations.Count() != 0) 
            {
                foreach (var location in locations)
                {
                    model.Add(new LocationModel
                    {
                        LocationId = location.Id,
                        LocationName = location.Location1
                    });
                }
            }

            return model;
        }

        public LocationModel GetLocationById(int id)
        {
            var location = _context.Locations.FirstOrDefault(x => x.Id == id);
            var model = new LocationModel();

            if(location != null)
            {
                model.LocationId = location.Id;
                model.LocationName = location.Location1;
            }
            return model;
        }
    }
}
