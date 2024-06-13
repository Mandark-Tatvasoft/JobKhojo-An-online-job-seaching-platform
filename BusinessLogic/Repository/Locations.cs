using BusinessLogic.Repository.Interfaces;
using Data.ApplicationDbContext;
using Data.Data;
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
            var locations = _context.Locations.ToList().OrderBy(l => l.Location1);
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

        public bool AddLocation(LocationModel model)
        {
            var newLocation = new Location()
            {
                Location1 = model.LocationName
            };

            try
            {
                _context.Locations.Add(newLocation);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public bool EditLocation(LocationModel model)
        {
            var location = _context.Locations.FirstOrDefault(l => l.Id == model.LocationId);
            if (location != null)
            {
                location.Location1 = model.LocationName;
                try
                {
                    _context.SaveChanges();
                    return true;
                }

                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
}
