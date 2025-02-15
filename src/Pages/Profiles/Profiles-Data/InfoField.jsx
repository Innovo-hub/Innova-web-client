//this Component to store data that have label(InfoField({ label, value }))
 
function InfoField({ label, value, className = '', isBusinessRole = false }) {
    return (
      <div className={`flex items-center gap-1 ${className}`}>
        <span className="text-[#126090] font-medium">{label}:</span>
        {isBusinessRole ? (
          <>
            <span className="text-[#4b4a4ad6]">{value}</span>
          </>
        ) : (
          <span
            className={`${
              label === "Role" ? "text-[#126090]" : "text-[#000000]"
            }`}
          >
            {value}
          </span>
        )}
      </div>
    );
  }
  export default InfoField;
  