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

        }
    }
}
