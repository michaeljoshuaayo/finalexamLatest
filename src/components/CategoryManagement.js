const CategoryManagement = ({Margin, newCategory, setNewCategory, Button, addCategory,categories, editIndex, editCategory, setEditCategory, editCategoryHandler ,deleteCategory, updateCategory}) => {
    return(
        <>
        <div class="col-lg-3">
            <div style={Margin}>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />{'  '}
              <Button onClick={addCategory} variant="success" >Add Category</Button>
            </div>
            <table class="table table-responsive " >
              <thead class='text-center'>
                <tr>
                  <th scope="col" class="bg-primary text-white">Category Name</th>
                  <th scope="col" class="bg-primary text-white">Action</th>
                </tr>
              </thead>
              <tbody id="tbodyproducts" class='text-center'>
                {categories.map((category, index) => (

                  <tr key={index}>
                    {editIndex === index ? (
                      <input
                        type="text"
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      />
                    ) : (
                      <td>{category}</td>
                    )}
                    {editIndex === index ? (
                      <Button onClick={updateCategory} variant="primary">Save</Button>
                    ) : (<td>
                      <Button onClick={() => editCategoryHandler(index, category)} variant="primary" >Update</Button>                   
                    <Button onClick={() => deleteCategory(index)} variant="danger">Delete</Button></td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
    )
}
export default CategoryManagement