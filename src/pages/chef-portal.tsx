import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Camera, Pencil, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MenuItem {
  id: string;
  chef_id: string;
  name: string;
  price: number;
  description?: string;
  image_url?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

interface ChefProfile {
  id: string;
  name: string;
  email: string;
  bannerUrl?: string;
}

const ChefPortal: React.FC = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    description: '',
    image_url: '',
    category: '',
  });
  const [chefProfile, setChefProfile] = useState<ChefProfile | null>(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);

  const categories = ['Mexican', 'American', 'Italian', 'Chinese', 'Indian', 'Japanese', 'Thai', 'Mediterranean', 'French', 'Greek'];

  useEffect(() => {
    if (user) {
      fetchMenuItems();
      fetchChefProfile();
    }
  }, [user]);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch(`/api/menu-items?chef_id=${user?.id}`);
      if (response.ok) {
        const data: MenuItem[] = await response.json();
        setMenuItems(data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch menu items',
        variant: 'destructive',
      });
    }
  };

  const fetchChefProfile = async () => {
    try {
      const response = await fetch(`/api/chef-profile?id=${user?.id}`);
      if (response.ok) {
        const data: ChefProfile = await response.json();
        setChefProfile(data);
        setBannerUrl(data.bannerUrl || '');
      }
    } catch (error) {
      console.error('Error fetching chef profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch chef profile',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setNewItem((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (value: string) => {
    setNewItem((prev) => ({ ...prev, category: value }));
  };

  const handleAddItem = async () => {
    try {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newItem, chef_id: user?.id }),
      });

      if (response.ok) {
        toast({ title: 'Menu item added successfully' });
        fetchMenuItems();
        setNewItem({ name: '', price: 0, description: '', image_url: '', category: '' });
        setIsAddingItem(false);
      } else {
        toast({ title: 'Failed to add menu item', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
      toast({ title: 'Failed to add menu item', variant: 'destructive' });
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBannerUrl(e.target.value);
  };

  const handleBannerUpdate = async () => {
    try {
      const response = await fetch('/api/chef-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user?.id, bannerUrl }),
      });

      if (response.ok) {
        toast({ title: 'Banner updated successfully' });
        fetchChefProfile();
      } else {
        toast({ title: 'Failed to update banner', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      toast({ title: 'Failed to update banner', variant: 'destructive' });
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/menu-items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({ title: 'Menu item deleted successfully' });
        fetchMenuItems();
      } else {
        toast({ title: 'Failed to delete menu item', variant: 'destructive' });
      }
    } catch (error) {
      console.error('Error deleting menu item:', error);
      toast({ title: 'Failed to delete menu item', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Banner */}
      <div className="relative h-64 bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt="Chef Banner"
            className="w-full h-full object-cover absolute inset-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">{user?.fullName}'s Kitchen</h1>
            <p className="text-lg opacity-90">{user?.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Banner Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bannerUrl">Banner Image URL</Label>
                  <div className="mt-1 space-y-2">
                    <Input
                      id="bannerUrl"
                      value={bannerUrl}
                      onChange={handleBannerChange}
                      placeholder="Enter banner image URL"
                      className="w-full"
                    />
                    <Button 
                      onClick={handleBannerUpdate}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Update Banner
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Menu Items</CardTitle>
                <Button 
                  onClick={() => setIsAddingItem(!isAddingItem)}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add New Item
                </Button>
              </CardHeader>
              <CardContent>
                {isAddingItem && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="itemName">Item Name</Label>
                        <Input
                          id="itemName"
                          name="name"
                          value={newItem.name}
                          onChange={handleInputChange}
                          placeholder="e.g., Margherita Pizza"
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemPrice">Price ($)</Label>
                        <Input
                          id="itemPrice"
                          name="price"
                          type="number"
                          value={newItem.price ?? 0}
                          onChange={handleInputChange}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="itemDescription">Description</Label>
                        <Input
                          id="itemDescription"
                          name="description"
                          value={newItem.description}
                          onChange={handleInputChange}
                          placeholder="Describe your dish..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="itemImageUrl">Image URL</Label>
                        <Input
                          id="itemImageUrl"
                          name="image_url"
                          value={newItem.image_url}
                          onChange={handleInputChange}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="itemCategory">Category</Label>
                        <Select onValueChange={handleCategoryChange} value={newItem.category}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button 
                      onClick={handleAddItem}
                      className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Add to Menu
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  {menuItems.length > 0 ? (
                    menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center space-x-4">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Camera className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.description}</p>
                            <p className="text-xs text-gray-400">{item.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">${Number(item.price).toFixed(2)}</span>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Camera className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>No menu items yet. Add your first dish!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefPortal;