import React, { useState, useRef } from "react";
import { 
  Button, 
  Stepper, 
  Step, 
  StepLabel, 
  TextField, 
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";
import { jsPDF } from "jspdf";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import html2canvas from 'html2canvas';
import { format } from 'date-fns';

const steps = [
  "Select Parties",
  "Investment Details",
  "Profit Distribution",
  "Agreement Terms",
  "Signature",
  "Review & Confirm",
  
];

const InvestmentContractForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    businessOwner: "",
    investor: "",
    platformName: "Innova Hub",
    projectName: "",
    investmentAmount: "",
    profitShare: "",
    productionCost: "",
    sellingPrice: "",
    contractDuration: "",
    refundPolicy: false,
    arbitrationAuthority: "",
    paymentMethod: "",
    businessOwnerSignature: "",
    investorSignature: "",
    platformSignature: "Innova Hub",
    investorShare: "",
  });
  const [pdfPreviewOpen, setPdfPreviewOpen] = useState(false);
  const pdfContractRef = useRef(null);

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const calculatePlatformShare = () => {
    const { productionCost, sellingPrice } = formData;
    const productionCostNum = Number(productionCost);
    const sellingPriceNum = Number(sellingPrice);
    const netProfit = sellingPriceNum - productionCostNum;

    if (netProfit <= 0) return "0.00";

    const profitPercentage = (netProfit / productionCostNum) * 100;
    const platformSharePercentage = (profitPercentage / 10) * 0.01; // 1% لكل 10% ربح
    const platformShare = netProfit * platformSharePercentage;

    return platformShare.toFixed(2);
  };

  const calculateNetProfitAfterPlatformFee = () => {
    const { productionCost, sellingPrice } = formData;
    const productionCostNum = Number(productionCost);
    const sellingPriceNum = Number(sellingPrice);
    const netProfit = sellingPriceNum - productionCostNum;

    if (netProfit <= 0) return 0;

    const platformProfit = parseFloat(calculatePlatformShare());
    return netProfit - platformProfit;
  };

  const calculateInvestorShare = () => {
    const { investorShare } = formData;
    const netProfitAfterFee = calculateNetProfitAfterPlatformFee();
    const investorShareNum = Number(investorShare);

    if (netProfitAfterFee <= 0 || investorShareNum <= 0) return "0.00";

    return (netProfitAfterFee * (investorShareNum / 100)).toFixed(2);
  };

  const calculateOwnerShare = () => {
    const { investorShare } = formData;
    const netProfitAfterFee = calculateNetProfitAfterPlatformFee();

    if (netProfitAfterFee <= 0) return "0.00";

    const investorProfit = parseFloat(calculateInvestorShare());
    return (netProfitAfterFee - investorProfit).toFixed(2);
  };

  // بيانات الجدول للعرض في خطوة المراجعة
  const getReviewTableData = () => [
    { label: "Business Owner", value: formData.businessOwner },
    { label: "Investor", value: formData.investor },
    { label: "Project Name", value: formData.projectName },
    { label: "Investment Amount", value: `$${formData.investmentAmount}` },
    { label: "Profit Share", value: `${formData.investorShare}%` },
    { label: "Production Cost", value: `$${formData.productionCost}` },
    { label: "Selling Price", value: `$${formData.sellingPrice}` },
    {
      label: "Investor's Profit Share",
      value: `$${calculateInvestorShare()}`,
      highlight: true,
    },
    {
      label: "Owner's Profit Share",
      value: `$${calculateOwnerShare()}`,
      highlight: true,
    },
    {
      label: "Platform's Profit Share",
      value: `$${calculatePlatformShare()}`,
      highlight: true,
    },
    {
      label: "Contract Duration",
      value: `${formData.contractDuration} Months`,
    },
    { label: "Refund Policy", value: formData.refundPolicy ? "Yes" : "No" },
  ];

  // تنسيق التاريخ الحالي
  const currentDate = format(new Date(), "MMMM dd, yyyy");

  // فتح نافذة معاينة الـ PDF
  const handleOpenPdfPreview = () => {
    setPdfPreviewOpen(true);
  };

  // إغلاق نافذة معاينة الـ PDF
  const handleClosePdfPreview = () => {
    setPdfPreviewOpen(false);
  };

  // تصدير العقد كملف PDF
  const exportToPdf = async () => {
    if (!pdfContractRef.current) return;

    const contractElement = pdfContractRef.current;
    const canvas = await html2canvas(contractElement, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${formData.projectName}_Investment_Contract.pdf`);
  };

  return (
    <>
      <div className="bg-contract min-h-screen flex justify-center items-center py-8">
        <div className="max-w-4xl w-full mx-auto p-6 sm:p-10 bg-white rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl sm:text-3xl">
              Investment Form Contract
            </h1>
          </div>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            className="hidden sm:flex"
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div className="mt-6">
            {activeStep === 0 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold">1. Contracting Parties</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  This contract is between the business owner and the investor,
                  agreeing on investment terms.
                </p>
                <TextField
                  fullWidth
                  label="Business Owner Name"
                  name="businessOwner"
                  value={formData.businessOwner}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Investor Name"
                  name="investor"
                  value={formData.investor}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Platform Name"
                  name="platformName"
                  value={"Innova Hub"}
                  disabled
                />
              </div>
            )}

            {activeStep === 1 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold">2. Investment Details</h3>
                <TextField
                  fullWidth
                  label="Project Name"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Investment Amount ($)"
                  type="number"
                  name="investmentAmount"
                  value={formData.investmentAmount}
                  onChange={handleChange}
                />
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold">3. Profit Distribution</h3>

                <TextField
                  fullWidth
                  label="Profit Share (%)"
                  type="number"
                  name="investorShare"
                  value={formData.investorShare}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Production Cost per Unit ($)"
                  type="number"
                  name="productionCost"
                  value={formData.productionCost}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  label="Selling Price per Unit ($)"
                  type="number"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                />
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold">4. Agreement Terms</h3>
                <TextField
                  fullWidth
                  label="Contract Duration (Months)"
                  type="number"
                  name="contractDuration"
                  value={formData.contractDuration}
                  onChange={handleChange}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="refundPolicy"
                      checked={formData.refundPolicy}
                      onChange={handleChange}
                    />
                  }
                  label="Investor is entitled to a refund if the project fails"
                />
                <TextField
                  fullWidth
                  label="Arbitration Authority"
                  name="arbitrationAuthority"
                  value={formData.arbitrationAuthority}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Payment Method"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                />
              </div>
            )}

            

            {activeStep === 4 && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold">6. Signature</h3>
                <TextField
                  fullWidth
                  label="Business Owner Signature"
                  name="businessOwnerSignature"
                  value={formData.businessOwnerSignature}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Investor Signature"
                  name="investorSignature"
                  value={formData.investorSignature}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  label="Platform Signature"
                  name="platformSignature"
                  disabled
                  value={"Innova Hub"}
                />
              </div>
            )}
            {activeStep === 5 && (
              <Box className="w-full">
                <Typography
                  variant="h5"
                  component="h3"
                  className="font-bold mb-6 text-center md:text-left"
                >
                  5. Contract Review
                </Typography>

                <TableContainer
                  component={Paper}
                  className="shadow-lg rounded-xl overflow-hidden border border-gray-200"
                >
                  <Table className="min-w-full divide-y divide-gray-200">
                    <TableBody>
                      {getReviewTableData().map((row, index) => (
                        <TableRow
                          key={index}
                          className={`
                            ${
                              index !== getReviewTableData().length - 1
                                ? "border-b border-gray-200"
                                : ""
                            }
                            ${row.highlight ? "bg-blue-50" : "hover:bg-gray-50"}
                            transition-colors duration-150
                          `}
                        >
                          <TableCell className="px-4 py-3 md:py-4 font-medium text-gray-900 w-1/2 md:w-2/5">
                            {row.label}
                          </TableCell>
                          <TableCell
                            className={`
                              px-4 py-3 md:py-4 w-1/2 md:w-3/5
                              ${
                                row.highlight
                                  ? "text-green-700 font-medium"
                                  : "text-gray-700"
                              }
                            `}
                          >
                            {row.value}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box className="mt-6 flex justify-center">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={handleOpenPdfPreview}
                    className="px-6 py-2"
                  >
                    Preview & Export Contract
                  </Button>
                </Box>
              </Box>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className="w-1/3 sm:w-auto"
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={exportToPdf}
                className="w-1/3 sm:w-auto"
              >
                Finalize Contract
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className="w-1/3 sm:w-auto"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* PDF معاينة عقد */}
      <Dialog
        open={pdfPreviewOpen}
        onClose={handleClosePdfPreview}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: "#f8f9fa",
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, bgcolor: "#f0f4f8" }}>
          <Typography variant="h6">Contract Preview</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClosePdfPreview}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Paper
            ref={pdfContractRef}
            elevation={0}
            sx={{
              p: 4,
              backgroundColor: "white",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Investment Agreement
              </Typography>
              <Typography
                variant="subtitle1"
                align="center"
                color="textSecondary"
              >
                {currentDate}
              </Typography>
            </Box>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ borderBottom: "1px solid #ddd", pb: 1 }}
            >
              1. Parties
            </Typography>
            <Typography paragraph>
              This Investment Agreement (the "Agreement") is entered into by and
              between:
            </Typography>
            <Typography paragraph sx={{ pl: 2 }}>
              <strong>Business Owner:</strong> {formData.businessOwner}
              <br />
              <strong>Investor:</strong> {formData.investor}
              <br />
              <strong>Platform:</strong> {formData.platformName}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ borderBottom: "1px solid #ddd", pb: 1, mt: 3 }}
            >
              2. Project Details
            </Typography>
            <Typography paragraph>
              <strong>Project Name:</strong> {formData.projectName}
              <br />
              <strong>Investment Amount:</strong> ${formData.investmentAmount}
              <br />
              <strong>Contract Duration:</strong> {formData.contractDuration}{" "}
              Months
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ borderBottom: "1px solid #ddd", pb: 1, mt: 3 }}
            >
              3. Profit Distribution
            </Typography>
            <Typography paragraph>
              The parties agree to the following profit distribution structure:
            </Typography>
            <Box sx={{ pl: 2, mb: 2 }}>
              <Typography paragraph>
                <strong>Production Cost per Unit:</strong> $
                {formData.productionCost}
                <br />
                <strong>Selling Price per Unit:</strong> $
                {formData.sellingPrice}
                <br />
                <strong>Investor's Profit Share:</strong>{" "}
                {formData.investorShare}% (${calculateInvestorShare()} per unit)
                <br />
                <strong>Owner's Profit Share:</strong> ${calculateOwnerShare()}{" "}
                per unit
                <br />
                <strong>Platform's Fee:</strong> ${calculatePlatformShare()} per
                unit
              </Typography>
            </Box>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ borderBottom: "1px solid #ddd", pb: 1, mt: 3 }}
            >
              4. Terms and Conditions
            </Typography>
            <Typography paragraph>
              <strong>Refund Policy:</strong>{" "}
              {formData.refundPolicy
                ? "The Investor is entitled to a refund if the project fails as determined by the arbitration authority."
                : "No refund will be provided if the project fails."}
              <br />
              <strong>Arbitration Authority:</strong>{" "}
              {formData.arbitrationAuthority}
              <br />
              <strong>Payment Method:</strong> {formData.paymentMethod}
            </Typography>

            <Typography
              variant="h6"
              gutterBottom
              sx={{ borderBottom: "1px solid #ddd", pb: 1, mt: 3 }}
            >
              5. Signatures
            </Typography>
            <Box
              sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ width: "30%", textAlign: "center" }}>
                <Typography sx={{ borderTop: "1px solid #000", pt: 1 }}>
                  {formData.businessOwnerSignature || formData.businessOwner}
                </Typography>
                <Typography variant="body2">Business Owner</Typography>
              </Box>

              <Box sx={{ width: "30%", textAlign: "center" }}>
                <Typography sx={{ borderTop: "1px solid #000", pt: 1 }}>
                  {formData.investorSignature || formData.investor}
                </Typography>
                <Typography variant="body2">Investor</Typography>
              </Box>

              <Box sx={{ width: "30%", textAlign: "center" }}>
                <Typography sx={{ borderTop: "1px solid #000", pt: 1 }}>
                  {formData.platformSignature}
                </Typography>
                <Typography variant="body2">Platform Representative</Typography>
              </Box>
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
          <Button onClick={handleClosePdfPreview}>Close</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={exportToPdf}
            startIcon={<PictureAsPdfIcon />}
          >
            Export as PDF
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InvestmentContractForm;