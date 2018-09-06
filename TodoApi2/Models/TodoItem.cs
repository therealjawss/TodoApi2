using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi2.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string IsComplete { get; set; }
        [Column(TypeName = "Date")]
        public DateTime DueDate { get; set; }
    }
}
