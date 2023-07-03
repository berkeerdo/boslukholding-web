import { Card, CardContent, Typography } from "@mui/material";
import UpdateForm from "./UpdateForm";

export default function UpdateProfile() {
  return (
    <div className="container mx-auto my-3 md:my-6 p-2 md:p-3 bg-customBackground rounded-xl shadow-2xl">
      <Typography variant="h5" className="text-center">
        Profilinizi Güncelleyin
      </Typography>
      <div className="flex justify-center mt-4">
        <Card sx={{ maxWidth: 500 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Email ve Kullanıcı Adı Değiştir
            </Typography>
            <UpdateForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
