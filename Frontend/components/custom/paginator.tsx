import { useTaskStore } from "@/lib/store/task.store";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

const Paginator = () => {
  const { page, totalPages, setPage } = useTaskStore();

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            className="cursor-pointer"
            variant={"ghost"}
            onClick={handlePrev}
            disabled={page === 1}
          >
            <ArrowLeft />
            Previous
          </Button>
        </PaginationItem>
        {[...Array(totalPages)].map((_, i) => {
          return (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? "bg-primary text-white" : ""}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            className="cursor-pointer"
            variant={"ghost"}
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next <ArrowRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
