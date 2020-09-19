using Shop.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shop.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<User>
    {
#pragma warning disable CS0114 // El miembro oculta el miembro heredado. Falta una contraseña de invalidación
        public DbSet<User> Users { get; set; }
#pragma warning restore CS0114 // El miembro oculta el miembro heredado. Falta una contraseña de invalidación
        public DbSet<Image> Images { get; set; }
        public DbSet<Opinion> Opinions { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<ProductProfile> ProductsProfile { get; set; }
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {

        }

           
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Image>()
                .Property(b => b.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<ProductProfile>()
              .Property(b => b.Id)
              .ValueGeneratedOnAdd();
            modelBuilder.Entity<Product>()
              .Property(b => b.Id)
              .ValueGeneratedOnAdd();
            modelBuilder.Entity<Opinion>()
              .Property(b => b.Id)
              .ValueGeneratedOnAdd();
           
            modelBuilder.Entity<Categories>(u =>
            {
                u.HasKey(b => b.Id);
                u.Property(b => b.Id).ValueGeneratedOnAdd();
            });
            modelBuilder.Entity<Categories>().HasData(
            new Categories
            {
                Id = "1",
                Identifier = 1,
                Name = "Ordenadores",
                Level = 0

            }) ;
                modelBuilder.Entity<Categories>().HasData(
               new Categories
               {
                   Id = "2",
                   Identifier = 2,
                   Name = "Sobremesa",
                   Parent_Identifier = 1,
                   Level = 1
               });
                    modelBuilder.Entity<Categories>().HasData(
                   new Categories
                   {
                       Id = "3",
                       Identifier = 3,
                       Name = "Gaming",
                       Parent_Identifier = 2,
                       Level = 2
                   });
                    modelBuilder.Entity<Categories>().HasData(
                   new Categories
                   {
                       Id = "4",
                       Identifier = 4,
                       Name = "Oficina",
                       Parent_Identifier = 2,
                       Level = 2
                   });  
                modelBuilder.Entity<Categories>().HasData(
              new Categories
              {
                  Id = "5",
                  Identifier = 5,
                  Name = "Portatiles",
                  Parent_Identifier = 1,
                  Level = 1

              });
                    modelBuilder.Entity<Categories>().HasData(
                  new Categories
                  {
                      Id = "6",
                      Identifier = 6,
                      Name = "Gaming",
                      Parent_Identifier = 5,
                      Level = 2

                  });
                    modelBuilder.Entity<Categories>().HasData(
                  new Categories
                  {
                      Id = "7",
                      Identifier = 7,
                      Name = "Oficina",
                      Parent_Identifier = 5,
                      Level = 2

                  });
                    modelBuilder.Entity<Categories>().HasData(
                  new Categories
                  {
                      Id = "8",
                      Identifier = 8,
                      Name = "UltraBook",
                      Parent_Identifier = 5,
                      Level = 2

                  });
            modelBuilder.Entity<Categories>().HasData(
           new Categories
           {
               Id = "9",
               Identifier = 9,
               Name = "Periféricos",
               Level = 1

           });
                modelBuilder.Entity<Categories>().HasData(
               new Categories
               {
                   Id = "10",
                   Identifier = 10,
                   Name = "Ratones",
                   Parent_Identifier =9,
                   Level = 2

               });
                modelBuilder.Entity<Categories>().HasData(
              new Categories
              {
                  Id = "11",
                  Identifier = 11,
                  Name = "Teclados",
                  Parent_Identifier = 9,
                  Level = 2

              });
            modelBuilder.Entity<Categories>().HasData(
           new Categories
           {
               Id = "12",
               Identifier = 12,
               Name = "Televisores",
               Level = 0

           });
        }
    }
}
