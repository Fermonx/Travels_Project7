module.exports=(hbs)=>{
  hbs.registerHelper('is_active', (index, number)=>{
      return(index + 1) == number ? 'active' : '';
  });

  hbs.registerHelper('prev_link', (pagination)=>{

  })
};